import React, { useState } from 'react';
import { Button, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CustomDateTimePicker = ({
   isDatePickerVisible,
   pickerMode,
   onConfirm,
   onCancel,
   ...res
}) => {
   return (
      <View>
         <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={pickerMode}
            onConfirm={onConfirm}
            onCancel={onCancel}
            {...res}
         />
      </View>
   );
};

export default CustomDateTimePicker;
