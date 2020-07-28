import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { NotificationCard } from '../notificationCard';
import moment from 'moment';
import { EmptyList } from '../noData';
import { MAIN_COLOR } from '../../constants/colors';

const NotificationList = ({ data, handleRefresh, refreshing }) => {
   const Ids = [...new Set(data.map(item => item.TransactionID))];
   const notRedundency = Ids.map(id =>
      data.find(notification => notification.TransactionID === id)
   )
      .filter(x => x.TransactionID)
      .sort(
         (a, b) =>
            new Date(moment(b.TimeStamp, 'YYYY-MM-DD hh:mm:ss')).getTime() -
            new Date(moment(a.TimeStamp, 'YYYY-MM-DD hh:mm:ss')).getTime()
      );
   // console.log('notRedundency', notRedundency);

   return (
      <FlatList
         data={notRedundency}
         keyExtractor={(item, index) => `${item.TransactionID}`}
         style={{ flexGrow: 1 }}
         contentContainerStyle={{
            flexGrow: 1,
         }}
         renderItem={({
            item,
            item: { TimeStamp, StudentName, Type },
            index,
         }) => {
            return (
               <NotificationCard
                  notificationTimeText={moment(
                     TimeStamp,
                     'YYYY-MM-DD hh:mm:ss'
                  ).format('LLL')}
                  notificationIconSize={20}
                  containerStyle={{ alignSelf: 'center' }}
                  notificationName={Type}
                  notificationDetailes={
                     Type.toLowerCase() == 'in'
                        ? `your child ${StudentName} enter the school`
                        : `your child ${StudentName} leave the school`
                  }
               />
            );
         }}
         ListEmptyComponent={() => (
            <EmptyList emptyText="No notifications yet" />
         )}
         refreshControl={
            <RefreshControl
               refreshing={refreshing}
               onRefresh={handleRefresh}
               colors={[MAIN_COLOR]}
            />
         }
      />
   );
};

export default NotificationList;
