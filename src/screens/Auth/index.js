import React, { Component } from 'react';
import { Text, View, StyleSheet, Keyboard, Image } from 'react-native';
import { CustomInput, CustomButton } from '../../components';
import { connect } from 'react-redux';
import * as Ations from '../../redux/actions';
import { getFcmToken } from '../../utils/firebase';
import { WHITE_COLOR } from '../../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
            <KeyboardAwareScrollView
               style={{
                  flex: 1,
                  width: '100%',
               }}
               contentContainerStyle={{ flexGrow: 1 }}
               enableOnAndroid={true}>
               <View
                  style={{
                     height: '40%',
                     width: '100%',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}>
                  <Image source={require('../../assets/splash.jpg')} />
               </View>
               <View style={styles.inputsContainer}>
                  <CustomInput
                     placeholder={'Name'}
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
                     placeholder={'Pssword'}
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
                        this.setState({
                           showPassword: !this.state.showPassword,
                        })
                     }
                  />

                  <CustomButton
                     buttonTitle={'login'}
                     onButtonPressed={this.onLoginPressed}
                     buttonContainerStyle={styles.button}
                     loading={loginLoading}
                     spinnerColor={WHITE_COLOR}
                  />
               </View>
            </KeyboardAwareScrollView>
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
      height: '60%',
   },
   button: {
      width: '75%',
      marginVertical: 10,
   },
});
const mapStateToProps = state => ({
   name: state.Auth.loginName,
   password: state.Auth.loginPassword,
   loginLoading: state.Auth.loginLoading,
});

export default connect(
   mapStateToProps,
   Ations
)(Login);
