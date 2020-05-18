import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BLACK_COLOR, ERROR_RED_COLOR } from '../../constants/colors';
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
}) => {
   return (
      <View style={{ marginVertical: 10 }}>
         <View style={[styles.container, inputContainerStyle]}>
            {iconLeftName && (
               <Icon
                  name={iconLeftName}
                  style={[styles.leftIcon, iconLeftStyle]}
                  size={iconLeftSzie || responsiveFontSize(4)}
               />
            )}
            <TextInput
               placeholder={placeholder}
               style={[styles.input, inputStyle]}
               selectionColor={BLACK_COLOR}
               {...inputProps}
            />
            {IconRightName && (
               <Icon
                  name={IconRightName}
                  style={[styles.rightIcon, iconRightStyle]}
                  size={iconRightSize || responsiveFontSize(4)}
                  onPress={onRightIconPressed}
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
      borderBottomColor: BLACK_COLOR,
      borderBottomWidth: 1,
      fontSize: responsiveFontSize(2.5),
      padding: 10,
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
