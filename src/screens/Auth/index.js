import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CustomInput, CustomButton } from '../../components';
import { connect } from 'react-redux';
import * as Ations from '../../redux/actions';
class Login extends Component {
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
                  }}
               />
               <CustomInput
                  placeholder={'password'}
                  iconLeftName="lock-outline"
                  inputProps={{
                     secureTextEntry: true,
                     onChangeText: loginPassword => {
                        this.props.onInputsChange(
                           'loginPassword',
                           loginPassword
                        );
                     },
                     value: password,
                  }}
               />
            </View>
            <CustomButton
               buttonTitle={'login'}
               onButtonPressed={() => onLoginPressed(navigation)}
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
