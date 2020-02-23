import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { CustomButton } from '../../components';
import { connect } from 'react-redux';
import { getNotification, onLogoutPressed } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Home = ({ navigation, route }) => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getNotification());
   }, []);
   return (
      <View>
         <Text> Home </Text>
         <CustomButton
            buttonTitle={'logout'}
            onButtonPressed={() => dispatch(onLogoutPressed(navigation))}
         />
      </View>
   );
};

export default Home;
