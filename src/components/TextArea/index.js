import React from 'react';
import { View, Text, StyleSheet, I18nManager, TextInput } from 'react-native';
import { INPUT_COLOR, TEXT_COLOR, SCREEN_HEIGHT } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { CustomText } from '../customText';
const TextArea = ({
   placeholder,
   placeholderTextColor,
   error,
   errorText,
   ...res
}) => {
   return (
      <View style={styles.textareaContainer}>
         <TextInput
            style={styles.textarea}
            maxLength={120}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid={'transparent'}
            autoCorrect={null}
            autoCapitalize="none"
            {...res}
         />

         <View
            style={{
               alignSelf: 'center',
            }}>
            <CustomText
               textStyle={{
                  alignSelf: 'flex-start',
                  color: 'red',
               }}
               text={errorText}
            />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   textareaContainer: {
      width: '90%',
      height: SCREEN_HEIGHT / 8,
      backgroundColor: INPUT_COLOR,
      alignSelf: 'center',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      borderWidth: 0.4,
      borderRadius: 10,
      borderColor: TEXT_COLOR,
      marginVertical: 10,
   },
   textarea: {
      // textAlignVertical: 'top',
      width: '100%',
      height: '95%',
      fontSize: responsiveFontSize(2),
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      borderRadius: 3,
      color: TEXT_COLOR,
      fontFamily: 'NunitoSans-Light',
      /*  alignItems: 'center',
      justifyContent: 'center', */
      padding: 5,
      paddingHorizontal: 10,
      marginBottom: 5,
   },
});

export default TextArea;
