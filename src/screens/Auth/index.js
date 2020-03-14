import React, { Component } from 'react';
import { Text, View, StyleSheet, Keyboard } from 'react-native';
import { CustomInput, CustomButton } from '../../components';
import { connect } from 'react-redux';
import * as Ations from '../../redux/actions';
import { getFcmToken } from '../../utils/firebase';
class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showPassword: false,
      };
      getFcmToken();
   }

   onLoginPressed = () => {
      const { navigation, onLoginPressed } = this.props;
      Keyboard.dismiss();
      onLoginPressed(navigation);
   };
   render() {
      const {
         name,
         password,
         navigation,
         loginLoading,
         onLoginPressed,
      } = this.props;

      return (
         <View style={styles.container}>
            <View style={styles.inputsContainer}>
               <CustomInput
                  placeholder={'name'}
                  iconLeftName="account"
                  inputProps={{
                     onChangeText: loginName => {
                        this.props.onInputsChange('loginName', loginName);
                     },
                     value: name,
                     returnKeyType: 'next',
                     onSubmitEditing: () => this.passwordInput.focus(),
                     blurOnSubmit: false,
                  }}
               />
               <CustomInput
                  placeholder={'password'}
                  iconLeftName="lock-outline"
                  inputProps={{
                     ref: ref => (this.passwordInput = ref),
                     secureTextEntry: !this.state.showPassword,
                     onChangeText: loginPassword => {
                        this.props.onInputsChange(
                           'loginPassword',
                           loginPassword
                        );
                     },
                     value: password,
                  }}
                  IconRightName={
                     !this.state.showPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                  }
                  onRightIconPressed={() =>
                     this.setState({ showPassword: !this.state.showPassword })
                  }
               />
            </View>
            <CustomButton
               buttonTitle={'login'}
               onButtonPressed={this.onLoginPressed}
               buttonContainerStyle={styles.button}
               loading={loginLoading}
               spinnerColor={'#fff'}
            />
         </View>
      );
   }
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
   },
   inputsContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
   },
   button: {
      width: '75%',
   },
});
const mapStateToProps = state => ({
   name: state.Auth.loginName,
   password: state.Auth.loginPassword,
   loginLoading: state.Auth.loginLoading,
});

export default connect(mapStateToProps, Ations)(Login);
