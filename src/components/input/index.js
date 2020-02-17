import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
}) => {
   return (
      <View style={{ marginVertical: 10 }}>
         <View style={[styles.container, inputContainerStyle]}>
            {iconLeftName && (
               <Icon
                  name={iconLeftName}
                  style={[styles.leftIcon, iconLeftStyle]}
                  size={iconLeftSzie || 17}
               />
            )}
            <TextInput
               placeholder={placeholder}
               style={[styles.input, inputStyle]}
               {...inputProps}
            />
            {IconRightName && (
               <Icon
                  name={IconRightName}
                  style={[styles.rightIcon, iconRightStyle]}
                  size={iconRightSize || 17}
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
      borderBottomColor: '#000',
      borderBottomWidth: 1,
   },
   leftIcon: {
      marginHorizontal: 5,
   },
   rightIcon: {
      marginHorizontal: 5,
   },
   errorText: {
      color: '#f00',
      marginVertical: 4,
      fontSize: 18,
   },
});

export default CustomInput;
