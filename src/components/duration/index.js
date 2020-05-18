import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import DateTimeButton from './DateTimePickerButton';
import CustomDateTimePicker from './DateTimePicker';
import { WHITE_COLOR, MAIN_COLOR, SCREEN_HEIGHT } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { onSearchInputsChange } from '../../redux/actions';
import moment from 'moment';
import { date } from '@nozbe/watermelondb/decorators';
import { CustomButton } from '../Button';
import { CustomText } from '../customText';
import Reactotron from 'reactotron-react-native';
const now = new Date();

const SearchDuration = ({ modalMessage }) => {
   const dispatch = useDispatch();
   const colorScheme = useColorScheme();
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [currentActive, setCurrentActive] = useState('');
   const [mode, setMode] = useState('date');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   const showDatePicker = duration => {
      setDatePickerVisibility(true);
      setMode('date');
      setCurrentActive(duration);
   };

   const hideDatePicker = () => {
      setDatePickerVisibility(false);
      setCurrentActive('');
   };

   const handleConfirm = date => {
      hideDatePicker();
      switch (currentActive) {
         case 'startDate':
            /* Reactotron.log(moment(date.timestamp).format('DD-MM-YYYY')); */
            setStartDate(
               moment(date)
                  .format('DD-MM-YYYY')
                  .toString()
            );
            dispatch(onSearchInputsChange('startDate', date));
            break;

         case 'endDate':
            const isEndDateValid = moment(date).isSameOrAfter(
               moment(startDate, 'DD-MM-YYYY')
            );
            if (isEndDateValid) {
               setEndDate(
                  moment(date)
                     .format('DD-MM-YYYY')
                     .toString()
               );
               dispatch(onSearchInputsChange('endDate', date));
            } else {
               modalMessage.current.showMessage({
                  type: 'danger',
                  message: 'تاريخ الانتهاء يجب ان يكون بعد تاريخ البدايه',
               });
               setEndDate('')
            }
            break;
      }
   };
   return (
      <View style={[styles.container]}>
         <DateTimeButton
            text={startDate == '' ? 'من تاريخ' : startDate}
            iconEnd={'calendar'}
            iconEndType={'material-community'}
            iconEndColor={WHITE_COLOR}
            onPress={() => showDatePicker('startDate')}
         />
         <DateTimeButton
            text={endDate == '' ? 'إلي تاريخ' : endDate}
            iconEnd={'calendar'}
            iconEndType={'material-community'}
            iconEndColor={WHITE_COLOR}
            onPress={() => showDatePicker('endDate')}
         />
         <CustomDateTimePicker
            isDatePickerVisible={isDatePickerVisible}
            pickerMode={mode}
            onCancel={hideDatePicker}
            onConfirm={handleConfirm}
            isDarkModeEnabled={colorScheme === 'dark'}
            date={now}
            cancelTextIOS={'الغاء'}
            confirmTextIOS={'تأكيد'}
            customCancelButtonIOS={({onPress,label}) => (
               <CustomButton
                  buttonContainerStyle={{
                     ...styles.buttonIos,
                     borderRadius: 10,
                     height: SCREEN_HEIGHT / 20,
                  }}
                  buttonTitle={label}
                  buttonTitleStyle={{ color: MAIN_COLOR }}
                  onButtonPressed={()=>{
                     onPress()
                     if (currentActive=='startDate') {
                        setStartDate('')
                     } else {
                        setEndDate('')
                     }
                  }}
               />
            )}
            customConfirmButtonIOS={({onPress,label,}) => (
               <CustomButton
                  buttonContainerStyle={styles.buttonIos}
                  buttonTitle={label}
                  buttonTitleStyle={{ color: MAIN_COLOR }}
                  onButtonPressed={onPress}
               />
            )} 
            customHeaderIOS={() => (
               <CustomText
                  text="اختر تاريخ"
                  textStyle={{ color: MAIN_COLOR, alignSelf: 'center' }}
               />
            )}
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

export { SearchDuration };
