import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { IconButton } from '../IconButton';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { MAIN_COLOR } from '../../constants/colors';
const CustomDropDown = ({ labels, onMenuItemPressed, selectedItem }) => {
   const ref = useRef(null);
   return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
         <Menu
            button={
               <IconButton
                  iconName={'filter-outline'}
                  iconSize={responsiveFontSize(4)}
                  onIconPressed={() => ref.current.show()}
                  iconColor={MAIN_COLOR}
               />
            }
            ref={ref}>
            {labels.map((label, index) => {
               return (
                  <MenuItem
                     onPress={item => {
                        onMenuItemPressed(ref.current, label);
                     }}
                     key={index + label}
                     style={label === selectedItem ? styles.selectedItem : {}}>
                     {label}
                  </MenuItem>
               );
            })}
         </Menu>
      </View>
   );
};
const styles = StyleSheet.create({
   selectedItem: {
      backgroundColor: '#eee',
   },
});

export { CustomDropDown };
