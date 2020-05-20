import React from 'react';
import { View, Text, StyleSheet, I18nManager, TextInput } from 'react-native';
import { INPUT_COLOR, TEXT_COLOR, SCREEN_HEIGHT } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const TextArea = ({ placeholder, placeholderTextColor, ...res }) => {
   return (
      <View style={styles.textareaContainer}>
         <TextInput
            style={styles.textarea}
            maxLength={120}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            underlineColorAndroid={'transparent'}
            {...res}
         />
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
      borderWidth: 0.4,
      borderRadius: 10,
      borderColor: TEXT_COLOR,
   },
   textarea: {
      textAlignVertical: 'top',
      width: '100%',
      height: '100%',
      fontSize: responsiveFontSize(2),
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      borderRadius: 3,
      color: TEXT_COLOR,
      fontFamily: 'DroidArabicKufi',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      paddingHorizontal: 10,
   },
});

export default TextArea;
