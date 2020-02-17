import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomInput from '../../components/input';
import CustomButton from '../../components/button';
import { connect } from 'react-redux';
import * as Ations from '../../redux/actions';
class Login extends Component {
   render() {
      const { name, password } = this.props;
      console.log(name, password);

      return (
         <View style={styles.container}>
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
                     this.props.onInputsChange('loginPassword', loginPassword);
                  },
                  value: password,
               }}
            />
            <CustomButton
               buttonTitle={'login'}
               onButtonPressed={this.props.onLoginPressed}
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
});
const mapStateToProps = state => ({
   name: state.Auth.loginName,
   password: state.Auth.loginPassword,
});

export default connect(mapStateToProps, Ations)(Login);
