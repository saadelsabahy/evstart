import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import DateTimeButton from './DateTimePickerButton';
import CustomDateTimePicker from './DateTimePicker';
import { WHITE_COLOR, MAIN_COLOR, SCREEN_HEIGHT } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { onSearchInputsChange } from '../../redux/actions';
import moment from 'moment';

import Reactotron from 'reactotron-react-native';

const Duration = ({
   modalMessage,
   startDate,
   endDate,
   handleConfirm,
   startDateError,
   startDateErrorText,
   endDateError,
   endDateErrorText,
}) => {
   const dispatch = useDispatch();
   const colorScheme = useColorScheme();
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [currentActive, setCurrentActive] = useState('');
   const [mode, setMode] = useState('date');

   const showDatePicker = duration => {
      setDatePickerVisibility(true);
      setMode('date');
      setCurrentActive(duration);
   };

   const hideDatePicker = () => {
      setDatePickerVisibility(false);
      setCurrentActive('');
   };
   const tommorowOrAfterTommorow =
      currentActive == 'startDate'
         ? new Date(new Date().setDate(new Date().getDate() + 1))
         : new Date(moment(startDate, 'DD-MM-YYYY').add(1, 'day'));
   return (
      <View style={[styles.container]}>
         <DateTimeButton
            text={startDate == '' ? 'from' : startDate}
            iconEnd={'calendar'}
            iconEndType={'material-community'}
            iconEndColor={WHITE_COLOR}
            onPress={() => showDatePicker('startDate')}
            error={startDateError}
            errorText={startDateErrorText}
         />
         <DateTimeButton
            text={endDate == '' ? 'to' : endDate}
            iconEnd={'calendar'}
            iconEndType={'material-community'}
            iconEndColor={WHITE_COLOR}
            onPress={() => showDatePicker('endDate')}
            error={endDateError}
            errorText={endDateErrorText}
         />
         <CustomDateTimePicker
            isDatePickerVisible={isDatePickerVisible}
            pickerMode={mode}
            onCancel={hideDatePicker}
            onConfirm={selectedDate =>
               handleConfirm(selectedDate, currentActive, hideDatePicker())
            }
            isDarkModeEnabled={colorScheme === 'dark'}
            date={tommorowOrAfterTommorow}
            minimumDate={tommorowOrAfterTommorow}
         />
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '35%',
   },
   buttonIos: {
      width: '100%',
      backgroundColor: WHITE_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 0,
   },
});

export { Duration };
