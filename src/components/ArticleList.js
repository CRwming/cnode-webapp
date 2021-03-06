/**
 * Created by ming on 2017/3/2
 */
import React, {Component} from 'react';
import {ListItem, List} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';

let page = 1;
const styles = {
    primaryText: {
        fontWeight: "bold",
        paddingBottom: 15,
        paddingLeft: 10,
        verticalAlign: "middle",
    },
    secondaryText: {
        color: "#9d9d9d",
        fontWeight: 'bold',
        fontSize: 14,
        paddingLeft: 10
    },
    avatar: {
        borderRadius: 5,
        backgroundColor: "#ddd"
    },
    title: {
        display: "inline-block",
        padding: 0,
        width: "80%",
        overflow: "hidden",
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    textTop: {
        color: 'red',
        paddingRight: 10
    },
    more: {
        position: 'absolute',
        width: '100%',
        bottom: 10,
        height: 10
    }

};

const tab = {all: '全部', share: '分享', job: '招聘', good: '精华', ask: '问答'};

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1
        };
    }


    loadMore = () => {
        page++;
        console.log("page", page);
        if (page >= 8) {
            return
        }
        setTimeout(() => this.props.loadMore(page), 1500);

    };


    render() {
        const {isFetch, data, page} = this.props;
        let list = [];
        list.push(
            data.map((item, i) => (
                <Link key={i} to={'/article/' + item.id}
                      style={{textDecorationLine: 'none', textDecoration: 'none'}}>
                    <ListItem primaryText={<Title title={item}/>}
                              secondaryText={<Info info={item}/>}
                              leftAvatar={<Avatar style={styles.avatar}
                                                  src={item.author.avatar_url}/>}/>
                    <Divider inset={true}/>
                </Link>
            ))
        );
        return (
            <div>
                <Paper zDepth={2}>
                    {
                        (isFetch && page === 0) ?
                            <div style={{textAlign: 'center', paddingTop: 50}}><CircularProgress size={50}/>
                            </div> :
                            <List style={{
                                position: 'relative'
                            }}>

                                {/*<InfiniteLoader
                                 visitStyle={styles.more}
                                 onVisited={this.loadMore}/>

                                 {
                                 (isFetch && page > 1) &&
                                 <ListItem primaryText="加载中..." style={{textAlign: "center"}}/>
                                 }*/}
                                <InfiniteScroll
                                    next={this.loadMore}
                                    hasMore={true}
                                    loader={<h3 style={{textAlign: "center"}}>加载中...</h3>}>
                                    {data.map((item, i) => (
                                        <Link key={i} to={'/Article/' + item.id}
                                              style={{textDecorationLine: 'none', textDecoration: 'none'}}>
                                            <ListItem primaryText={<Title title={item}/>}
                                                      secondaryText={<Info info={item}/>}
                                                      leftAvatar={<Avatar style={styles.avatar}
                                                                          src={item.author.avatar_url}/>}/>
                                            <Divider inset={true}/>
                                        </Link>
                                    ))}
                                </InfiniteScroll>

                            </List>
                    }
                </Paper>
            </div>
        );
    }
}

const Title = (props) => (
    <div style={styles.primaryText}>
        {props.title.top && <span style={styles.textTop}>顶</span>}
        {props.title.good && <span style={styles.textTop}>精</span>}
        <span style={styles.title}>{props.title.title}</span>
    </div>
);
Title.propTypes = {
    title: React.PropTypes.object
};

const Info = (props) => (
    <div style={styles.secondaryText}>
        <span style={{paddingRight: 10}}>
            {props.info.reply_count}/{props.info.visit_count}
        </span>
        <span>{tab[props.info.tab]}</span>
    </div>
);
Info.propTypes = {
    info: React.PropTypes.object
};

ArticleList.propTypes = {
    data: React.PropTypes.array.isRequired,
    isFetch: React.PropTypes.bool.isRequired,
    loadMore: React.PropTypes.func,
    page: React.PropTypes.number,
};
ArticleList.defaultProps = {};
export default ArticleList;
