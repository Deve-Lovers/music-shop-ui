import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { userLogin } from '../../store/auth/actions';
import { AuthContext } from '../../store/context/context';
import Btn from './Button/BaseButton';
import Input from './Input/Input';

import ShopLogo from '../assets/logotype/shopLogotype.png';

class LoginStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'debiutant@test.pl',
      password: 'debiutant1234',
    };
  }

  setEmail = (value) => {
    this.setState({
      email: value,
    });
  };

  setPassword = (value) => {
    this.setState({
      password: value,
    });
  };

  submitHandler = (context) => {
    userLogin(this.state.email, this.state.password, context.signIn);
  };

  render() {
    return (
      <AuthContext.Consumer>
        {(context) => (
          <View style={styles.background}>
            <Image source={ShopLogo} style={styles.image} />
            <View style={styles.screen}>
              <Text style={styles.title}>Logowanie</Text>
              <Input placeholder="email" onChange={this.setEmail} />
              <Input placeholder="password" onChange={this.setPassword} isSecured />
              {/* <Text>{this.state.email}</Text> */}
              {/* <Text>{this.state.password}</Text> */}
              <Btn text="Zaloguj" onPress={() => this.submitHandler(context)} />
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
});

export default LoginStart;
