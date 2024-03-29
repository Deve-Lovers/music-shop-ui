import React, { Component } from 'react';
import { Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,} from 'react-native';

import { userLogin } from '../../store/auth/actions';
import { AuthContext } from '../../store/context/context';
import Btn from '../components/Buttons/LoginBtn';
import Input from '../components/Input/Input';
import ShowAndHide from '../components/ShowAndHideIcon/ShowAndHide';

import ShopLogo from '../assets/logotype/shopLogotype.png';
import { User } from '../oop/classes';

class LoginStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: new User('debiutant@test.pl', 'debiutant1234'),
      isValidUser: true,
      isSecured: true,
    };
  }

  setEmail = (value) => {
    let password = '';
    if (this.user) {
      password = this.user;
    }
    const new_user = new User(value, password);
    this.setState({
      user: new_user,
    });
  };

  setPassword = (value) => {
    let email = '';
    if (this.user) {
      email = this.user;
    }
    const new_user = new User(email, value);
    this.setState({
      user: new_user,
    });
  };

  setUserValidation = (value) => {
    this.setState({
      isValidUser: value,
    });
  };

  setIsSecured = (prevState) => {
    this.setState({
      isSecured: !prevState,
    });
  };

  submitHandler = (context) => {
    userLogin(this.state.user, context.signIn, this.setUserValidation);
  };

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <View style={styles.background}>
            <StatusBar backgroundColor="#7d52ff" barStyle="light-content" />
            <Image source={ShopLogo} style={styles.image} />
            <View style={styles.screen}>
              <ScrollView>
                <KeyboardAvoidingView behavior="position">
                  <Text style={styles.title}>Logowanie</Text>
                  <Input placeholder="email" onChange={this.setEmail} />
                  <Input
                    placeholder="password"
                    onChange={this.setPassword}
                    isSecured={this.state.isSecured}
                  >
                    <ShowAndHide
                      setIsSecured={this.setIsSecured}
                      isSecured={this.state.isSecured}
                    />
                  </Input>
                  {this.state.isValidUser ? null : (
                    <Text style={styles.errorMessage}>Niepoprawne dane logowania</Text>
                  )}
                  {/* <Text>{this.state.email}</Text> */}
                  {/* <Text>{this.state.password}</Text> */}
                  <Btn text="Zaloguj" onPress={() => this.submitHandler(context)} />
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#7d52ff',
  },
  image: {
    alignSelf: 'center',
    marginBottom: 75,
  },
  screen: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
  },
  title: {
    color: '#571fff',
    fontSize: 26,
    fontWeight: '700',
    marginHorizontal: 40,
    marginTop: 35,
    marginBottom: 10,
  },
  errorMessage: {
    color: '#d80000',
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default LoginStart;
