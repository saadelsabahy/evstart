import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN_COLOR, ERROR_RED_COLOR } from '../../constants/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const CustomInput = ({
   placeholder,
   inputContainerStyle,
   inputStyle,
   iconLeftName,
   IconRightName,
   iconLeftStyle,
   iconRightStyle,
   iconLeftSzie,
   iconRightSize,
   inputProps,
   error,
   errorText,
   errorTextStyle,
   onRightIconPressed,
   iconRightColor,
   iconLeftColor,
}) => {
   return (
      <View style={{ marginVertical: 10 }}>
         <View style={[styles.container, inputContainerStyle]}>
            {iconLeftName && (
               <Icon
                  name={iconLeftName}
                  style={[styles.leftIcon, iconLeftStyle]}
                  size={iconLeftSzie || responsiveFontSize(4)}
                  color={iconLeftColor || MAIN_COLOR}
               />
            )}
            <TextInput
               placeholder={placeholder}
               style={[styles.input, inputStyle]}
               selectionColor={MAIN_COLOR}
               autoCapitalize="none"
               placeholderTextColor="#989"
               {...inputProps}
            />
            {IconRightName && (
               <Icon
                  name={IconRightName}
                  style={[styles.rightIcon, iconRightStyle]}
                  size={iconRightSize || responsiveFontSize(4)}
                  onPress={onRightIconPressed}
                  color={iconRightColor || MAIN_COLOR}
               />
            )}
         </View>
         {error && (
            <Text style={[styles.errorText, errorTextStyle]}>{errorText}</Text>
         )}
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      width: '90%',
      height: 60,
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   input: {
      flex: 1,
      borderBottomColor: MAIN_COLOR,
      borderBottomWidth: 1,
      fontSize: responsiveFontSize(2.5),
      padding: 10,
      color: MAIN_COLOR,
   },
   leftIcon: {
      marginHorizontal: 5,
   },
   rightIcon: {
      marginHorizontal: 5,
   },
   errorText: {
      color: ERROR_RED_COLOR,
      marginVertical: 4,
      fontSize: 18,
   },
});

export { CustomInput };
