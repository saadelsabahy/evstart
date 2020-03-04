import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NotificationCard } from '../notificationCard';
import moment from 'moment';
import { EmptyList } from '../noData';

const NotificationList = ({ data }) => {
   return (
      <FlatList
         data={data}
         keyExtractor={(item, index) => `${index}`}
         style={{ flexGrow: 1 }}
         contentContainerStyle={{
            flexGrow: 1,
         }}
         renderItem={({ item, index }) => {
            return (
               <NotificationCard
                  /* notificationTimeText={moment
                     .unix(item.date.seconds)
                     .format('LT')}
                  notificationDateText={moment
                     .unix(item.date.seconds)
                     .format('DD-MM-YYYY')} */
                  notificationIconSize={20}
                  containerStyle={{ alignSelf: 'center' }}
                  notificationName={'login'}
                  notificationDetailes={`${index}`}
               />
            );
         }}
         ListEmptyComponent={() => (
            <EmptyList iconSize={40} emptyText="No notifications yet" />
         )}
      />
   );
};

export default NotificationList;
