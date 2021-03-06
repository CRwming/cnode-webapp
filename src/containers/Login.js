/**
 * Created by ming on 2017/2/27
 */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userLogin} from '../actions/actions';
import {browserHistory} from 'react-router';
import Header from '../components/Header';

const styles = {
    main: {
        textAlign: "center",
        margin: '0 auto',
        padding: 15,
        paddingTop: 80,
    },
    unLine: {
        borderColor: '#ee1862'
    },
    unLineSt: {
        borderColor: "#00"
    },
    login: {
        marginTop: 20
    },
    floatingLabelStyle: {
        color: "#000"
    },
    floatingLabelFocusStyle: {
        color: "#129e3d",
    },
};

let err = '';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accesstoken: ''
        };
    }

    componentWillReceiveProps(newProps) {
        const {userState} = newProps;

        if (userState.res) {
            err = !userState.res.success ?
                <h3 style={{color: "red"}}>{userState.res.response.data.error_msg}</h3> : "";
        }

        if (userState.isLogin && userState.res !== undefined) {
            const accesstoken = this.state.accesstoken;
            const loginName = userState.res.loginname;
            const id = userState.res.id;
            const avatarURL = userState.res.avatar_url;
            const userAcc = JSON.stringify({loginName, accesstoken, id, avatarURL});
            window.localStorage.setItem('userAcc', userAcc);
            browserHistory.push('/')
        }
    }

    handleChange = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value.trim(),
        });
    };

    clickLogin = (e) => {
        e.preventDefault();
        if (this.state.accesstoken !== '') {
            this.props.userAction(this.state.accesstoken);
        }
    };

    handleBack = () => {
        browserHistory.go(-1)
    };

    render() {
        return (
            <div>
                <Header click={this.handleBack}
                        title="登录" goBack={true}/>
                <div style={styles.main}>
                    <TextField underlineFocusStyle={styles.unLine}
                               value={this.state.accesstoken}
                               name="accesstoken"
                               onChange={this.handleChange}
                               hintText="Access Token"
                               floatingLabelText="Access Token"
                               floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                               floatingLabelStyle={styles.floatingLabelStyle}
                               underlineStyle={styles.unLineSt}
                               fullWidth={true}/>
                    <RaisedButton style={styles.login}
                                  primary={true}
                                  onClick={this.clickLogin}
                                  label="提交"/>
                    {err}
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    userAction: React.PropTypes.func
};
Login.defaultProps = {};

function mapStateToProps(state) {
    return {
        userState: state.userReduce
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userAction: bindActionCreators(userLogin, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
