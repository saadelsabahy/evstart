import React, { useEffect, useState, useRef } from 'react';
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
   clearApsenseRequestDates,
} from '../../redux/actions';
import TextArea from '../TextArea';
import { CustomButton } from '../button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from '../Icon';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import FlashMessage from 'react-native-flash-message';
const AbsenseRequestModal = ({
   isVisible,
   onConfirmAbsenceRequest,
   hideModal,
   studentName,
   loading,
}) => {
   const dispatch = useDispatch();
   const modalFlashMessage = useRef(null);
   const [startDateErrorText, setstartDateErrorText] = useState('');
   const [endDateErrorText, setendDateErrorText] = useState('');
   const [absenseReasonError, setabsenseReasonError] = useState('');
   const { absenseStartDate, absenseEndDate, absenseReason } = useSelector(
      state => ({
         absenseStartDate: state.UserProfile.absenseStartDate,
         absenseEndDate: state.UserProfile.absenseEndDate,
         absenseReason: state.UserProfile.absenseReason,
      })
   );
   const handleConfirmAbsenseRequest = () => {
      if (!absenseReason && !absenseStartDate && !absenseEndDate) {
         setstartDateErrorText('required');
         setendDateErrorText('required');
         setabsenseReasonError('required');
         return;
      } else if (!absenseStartDate) {
         setstartDateErrorText('required');
         return;
      } else if (!absenseEndDate) {
         setendDateErrorText('required');
         return;
      } else if (!absenseReason || absenseReason.length < 3) {
         setabsenseReasonError('must be more than 2 characters');
         return;
      } else {
         setabsenseReasonError('');
         setstartDateErrorText('');
         setendDateErrorText('');
         onConfirmAbsenceRequest();
      }
   };
   return (
      <Modal
         isVisible={isVisible}
         style={styles.modal}
         avoidKeyboard
         onBackButtonPress={hideModal}
         onModalHide={() => {
            setabsenseReasonError('');
            setstartDateErrorText('');
            setendDateErrorText('');
            dispatch(onAbsenseReasonChange(''));
            dispatch(clearApsenseRequestDates());
         }}>
         <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.contentContainer}>
               <View
                  style={{
                     flex: 1,
                     width: '100%',
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     height: '15%',
                  }}>
                  <Icon
                     name={'close'}
                     type={'material-community'}
                     onPress={() => {
                        hideModal();
                     }}
                     iconContainerStyle={{
                        flex: 0.3,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                     }}
                     color={TEXT_COLOR}
                     size={responsiveFontSize(4)}
                  />

                  <View
                     style={{
                        flex: 1,
                        alignSelf: 'center',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                     }}>
                     <CustomText text={`absense request for  ${studentName}`} />
                  </View>
               </View>

               <Duration
                  startDate={absenseStartDate}
                  endDate={absenseEndDate}
                  handleConfirm={(date, active, hide) =>
                     dispatch(onConfirmSelectDate(date, active, hide))
                  }
                  startDateError={startDateErrorText.length > 0}
                  startDateErrorText={startDateErrorText}
                  endDateError={endDateErrorText.length > 0}
                  endDateErrorText={endDateErrorText}
                  modalMessage={modalFlashMessage}
               />

               <TextArea
                  placeholder={'Absense reason'}
                  value={absenseReason}
                  placeholderTextColor={'#999'}
                  onChangeText={text => dispatch(onAbsenseReasonChange(text))}
                  error={absenseReasonError.length > 0}
                  errorText={absenseReasonError}
               />
               <CustomButton
                  buttonContainerStyle={{ marginVertical: 10 }}
                  buttonTitle={'confirm'}
                  onButtonPressed={handleConfirmAbsenseRequest}
                  loading={loading}
                  spinnerColor={WHITE_COLOR}
               />
            </View>
            <FlashMessage
               ref={modalFlashMessage}
               position={'bottom'}
               textStyle={styles.flashText}
               titleStyle={styles.flashText}
               duration={2000}
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
   flashText: {
      fontSize: responsiveFontSize(1.5),
      textTransform: 'capitalize',
      marginBottom: 0,
      lineHeight: responsiveFontSize(1.5),
   },
});

export { AbsenseRequestModal };
