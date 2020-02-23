import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NotificationCard } from '../notificationCard';
import moment from 'moment';

const NotificationList = ({ data }) => {
   console.log(data);

   return (
      <FlatList
         data={data}
         keyExtractor={(item, index) => `${index}`}
         renderItem={({ item, index }) => {
            return (
               <NotificationCard
                  notificationTimeText={moment
                     .unix(item.date.seconds)
                     .format('LT')}
                  notificationDateText={moment
                     .unix(item.date.seconds)
                     .format('DD-MM-YYYY')}
                  notificationIconSize={20}
                  containerStyle={{ alignSelf: 'center' }}
                  notificationName={'login'}
                  notificationDetailes={item.fullname}
               />
            );
         }}
      />
   );
};

export default NotificationList;
