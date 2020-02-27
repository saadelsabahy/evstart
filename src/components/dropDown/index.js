import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { IconButton } from '../IconButton';
const CustomDropDown = ({ labels, onMenuItemPressed }) => {
   const ref = useRef(null);
   return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
         <Menu
            button={
               <IconButton
                  iconName={'filter-outline'}
                  iconSize={30}
                  onIconPressed={() => ref.current.show()}
               />
            }
            ref={ref}>
            {labels.map((label, index) => {
               return (
                  <MenuItem
                     onPress={() => {
                        onMenuItemPressed(ref.current);
                     }}
                     key={index + label}>
                     {label}
                  </MenuItem>
               );
            })}
         </Menu>
      </View>
   );
};

export { CustomDropDown };
