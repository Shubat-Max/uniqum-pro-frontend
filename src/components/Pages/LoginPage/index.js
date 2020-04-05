import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";
import styled from "styled-components";
import { systemStartup, authorize } from "../../../actions";

import FldEmail from "../../Forms/FormComponents/FldEmail";
import FldPassword from "../../Forms/FormComponents/FldPassword";
import BtnLogin from "../../Forms/FormComponents/BtnLogin";
import CbxRememberMe from "../../Forms/FormComponents/CbxRememberMe";
import LnkForgotPassword from "../../Forms/FormComponents/LnkForgotPassword";
import LoginError from "../../Errors/LoginError";
import ForgotPasswordModal from "../../Modals/ForgotPasswordModal";

import { Container, Row, Col } from "react-grid";

const LoginPage = () => {
  React.useEffect(() => {
    document.title = "Авторизация | Uniqum";
  });
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <Background>
      <StyledContainer>
        <StyledRow>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <LeftSideWrapper>
              <LogoImg src="/assets/img/uniqum-logo.png" alt="" />
              <Annotation>Товарищи! сложившаяся структура организации влечет за собой процесс внедрения и модернизации форм развития. Задача организации, в особенности же укрепление и развитие структуры в значительной степени обуславливает создание систем массового участия.</Annotation>
            </LeftSideWrapper>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <RightSideWrapper>
              <form>
                <div>
                  <BlockInputGroup>
                    <Label htmlFor="login">Логин</Label>
                    <LoginInput
                      type="text"
                      id="login"
                      placeholder="your@email.com"
                      autocomplete="off"
                      tabIndex="1"
                    />
                  </BlockInputGroup>
                  <BlockInputGroup>
                    <Label htmlFor="password">Пароль</Label>
                    <PasswordInput
                      type="password"
                      id="password"
                      autocomplete="off"
                      tabIndex="2"
                    />
                  </BlockInputGroup>
                </div>
                <ToolsGroup>
                  <RememberMe htmlFor="remember">
                    <input
                      type="checkbox"
                      id="remember"
                      tabIndex="3"
                    />
                    Запомнить меня
                  </RememberMe>
                  <ForgotPassword href="#">Забыли пароль?</ForgotPassword>
                </ToolsGroup>
                <LoginButton type="button" tabIndex="4">Войти</LoginButton>
              </form>
              <PoweredBy>Powered by React</PoweredBy>
            </RightSideWrapper>
          </Col>
        </StyledRow>
      </StyledContainer>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: url(/assets/img/background-login.jpg) #ececec center/cover
    no-repeat;
    overflow: auto;
`;
const StyledContainer = styled(Container)`
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
const StyledRow = styled(Row)`
  background: rgba(255,255,255,0.85);
  border-radius: 5px;
  width: 100%;
  margin: auto;
`;

const LeftSideWrapper = styled.div`
  padding: 40px 5px;
`;
const RightSideWrapper = styled.div`
  padding: 30px 30px 0;
  max-width: 350px;
  background: #fff; 
  margin: 40px auto;
  border-radius: 5px;
  box-shadow: 1px 2px 5px -2px rgba(0,0,0,0.49);
`;

const LogoImg = styled.img`
  width: 150px;
  display: block;
  margin: 0 auto 40px;
  -webkit-user-drag: none;
  user-select: none;
`;
const Annotation = styled.div`
  margin: 0 20px;
  text-align: justify;
  text-align-last: center;
  font: normal normal 300 14px/1.5em "Roboto", sans-serif;
`;

const BlockInputGroup = styled.div`
  margin-bottom: 20px;
  
  & > * {
    display: block;
  }
`;

const Input = styled.input`
  width: calc(100% - 20px);
  border: 1px solid #d2d2d2;
  border-radius: 3px;
  padding: 7px 7px;
  font: normal normal 300 14px/1em "Roboto", sans-serif;
`;
const LoginInput = Input;
const PasswordInput = Input;

const Label = styled.label`
  margin: 0 0 5px;
  font: normal normal 300 14px/1em "Roboto", sans-serif;
  letter-spacing: 1px;
`;
const ToolsGroup = styled.div`
  margin-bottom: 20px;
`;
const RememberMe = styled.label`
  font: normal normal 300 12px/1em "Roboto", sans-serif;
  letter-spacing: 1px;
  user-select: none;
  cursor: pointer;
  
  & > input[type="checkbox"] {
    margin-right: 5px;
    transform: translateY(2px);
  }
`;
const ForgotPassword = styled.a`
  float: right;
  //margin: 0 5px 0 0; 
  font: normal normal 300 12px/1em "Roboto", sans-serif;
  letter-spacing: 1px;
`;
const LoginButton = styled.button`
  display: block;
  width: 200px;
  margin: auto;
  border: none;
  border-radius: 2px;
  padding: 10px 0;
  font: normal normal 400 12px/1em "Roboto", sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: #00afef;
  color: #fff;
  cursor: pointer;
  
  &:hover {
    background: rgba(0,175,239,0.9);
  }
`;
const PoweredBy = styled.div`
padding-bottom: 10px;
  margin: 20px 0 0;
  text-align: center;
  font: normal normal 400 12px/1em "Roboto", sans-serif;
  color: #c2c2c2;
  user-select: none;
`;

const FormBackground = styled.div`
  background-color: #0d47a1;
  height: 100%;
  width: 100%;
`;






export default LoginPage;

export class LoginPagePrev extends Component {
  state = {
    loginErrorDisplay: false,
    loginHighlight: false,
    passwordHighlight: false,
    showForgotPassword: false
    // login: "",
    // pwd: ""
  };

  // componentDidMount() {
  //   document.title = "Uniqum | Авторизация";
  // }

  render() {
    return (
      <div className="login-wrapper">
        {this.getForgotPasswordModal()}

        <form action="#" className="login-form">
          <div className="logo-placeholder">
            <div className="logo">
              <img
                src="./assets/img/uniqum-logo.png"
                alt="Логотип платформы Uniqum"
              />
            </div>
          </div>

          {this.getLoginError()}
          <div className="credentials">
            <FldEmail changeHandler={this.handlerLoginChange.bind(this)} />
            <FldPassword changeHandler={this.handlerPwdChange.bind(this)} />
          </div>
          <div className="tools">
            <CbxRememberMe />
            <LnkForgotPassword onClick={() => this.modalFPSwitch(true)} />
          </div>
          <BtnLogin
            authorize={() =>
              this.checkIdentity(this.state.login, this.state.pwd)
            }
          />
        </form>

        <div className="tech-version">v0.7.5</div>
      </div>
    );
  }

  getLoginError = () => {
    if (this.state.loginErrorDisplay) {
      return <LoginError hideError={() => this.loginErrorSwitch(false)} />;
    }
  };

  getForgotPasswordModal = () => {
    if (this.state.showForgotPassword) {
      return <ForgotPasswordModal onClose={() => this.modalFPSwitch(false)} />;
    }
  };

  handlerLoginChange = login => {
    this.setState({
      login: login.trim()
    });
  };

  handlerPwdChange = pwd => {
    this.setState({
      pwd: pwd
    });
  };

  loginErrorSwitch = state => {
    this.setState({
      loginErrorDisplay: state
    });
  };

  modalFPSwitch = state => {
    this.setState({
      showForgotPassword: state
    });
  };

  checkIdentity = (login, pwd) => {
    // axios.post(`http://localhost:3001/users/auth`, {
    axios
      .post(`/api/users/auth`, {
        email: login,
        pwd: pwd
      })
      .then(res => {
        const user = res.data;
        if (user) {
          if (user._id && user.role) {
            this.props.systemStartup(user._id, user.role);
            this.props.authorize(user);
            const cookies = new Cookies();
            cookies.set("UID", user._id, { path: "/" });
            cookies.set("URID", user.role, { path: "/" });

            switch (user.role) {
              case 1:
                this.props.history.push("/admin");
                break;
              case 2:
                this.props.history.push("/trainer");
                break;
              case 3:
                this.props.history.push("/trainee");
                break;
              default:
                this.loginErrorSwitch(true);
                return null;
            }
          }
        }
        this.loginErrorSwitch(true);
      });
  };
}

// export default connect(null, {
//     systemStartup,
//     authorize
// })(LoginPage);
