import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import {
   WHITE_COLOR,
   SCREEN_HEIGHT,
   TEXT_COLOR,
   BLACK_COLOR,
} from '../../constants/colors';
import { CustomText } from '../customText';
import { Duration } from '../duration';
import { useDispatch, useSelector } from 'react-redux';
import {
   onConfirmSelectDate,
   handleAbsenseModalUnmount,
   onAbsenseReasonChange,
} from '../../redux/actions';
import TextArea from '../TextArea';
import { CustomButton } from '../button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from '../Icon';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const AbsenseRequestModal = ({
   isVisible,
   onConfirmAbsenceRequest,
   hideModal,
   studentName,
}) => {
   const dispatch = useDispatch();
   const { absenseStartDate, absenseEndDate, absenseReason } = useSelector(
      state => ({
         absenseStartDate: state.UserProfile.absenseStartDate,
         absenseEndDate: state.UserProfile.absenseEndDate,
         absenseReason: state.UserProfile.absenseReason,
      })
   );

   return (
      <Modal isVisible={isVisible} style={styles.modal}>
         <View style={styles.contentContainer}>
            <View
               style={{
                  flex: 1,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
               }}>
               <Icon
                  name={'close'}
                  type={'material-community'}
                  onPress={hideModal}
                  iconContainerStyle={{
                     flex: 0.2,
                     alignItems: 'flex-start',
                  }}
                  color={TEXT_COLOR}
               />

               <View
                  style={{
                     flex: 1,
                     alignSelf: 'center',
                  }}>
                  <CustomText
                     text={`absense request for ${studentName}`}
                     textStyle={{
                        fontSize: responsiveFontSize(2.2),
                     }}
                  />
               </View>
            </View>

            <Duration
               startDate={absenseStartDate}
               endDate={absenseEndDate}
               handleConfirm={(date, active, hide) =>
                  dispatch(onConfirmSelectDate(date, active, hide))
               }
            />

            <TextArea
               placeholder={'Absense reason'}
               value={absenseReason}
               placeholderTextColor={BLACK_COLOR}
               onChangeText={text => dispatch(onAbsenseReasonChange(text))}
            />
            <CustomButton
               buttonContainerStyle={{ marginVertical: 10 }}
               buttonTitle={'confirm'}
               onButtonPressed={onConfirmAbsenceRequest}
            />
         </View>
      </Modal>
   );
};
const styles = StyleSheet.create({
   modal: {
      flex: 1,
      justifyContent: 'flex-end',
      margin: 0,
   },
   contentContainer: {
      height: SCREEN_HEIGHT * 0.5,
      backgroundColor: WHITE_COLOR,
      margin: 0,
      padding: 0,
      marginHorizontal: 0,
      marginVertical: 0,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
   },
});

export { AbsenseRequestModal };
