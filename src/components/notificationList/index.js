import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { NotificationCard } from '../notificationCard';
import moment from 'moment';
import { EmptyList } from '../noData';
import { MAIN_COLOR } from '../../constants/colors';

const NotificationList = ({ data, handleRefresh, refreshing }) => {
   const Ids = [...new Set(data.map(item => item.notificationId))];
   const notRedundency = Ids.map(id =>
      data.find(notification => notification.notificationId === id)
   );
   /*    console.log(
      notRedundency.sort(
         (a, b) => new Date().getTime() - new Date(b.TimeStamp).getDate()
      )
   ); */

   return (
      <FlatList
         data={notRedundency.sort(
            (a, b) =>
               new Date(b.TimeStamp).getTime() - new Date(a.TimeStamp).getTime()
         )}
         keyExtractor={(item, index) => `${item.notificationId}`}
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
                     'MM/D/YYYY LT'
                  ).format('LLL')}
                  /*  {moment(TimeStamp, 'LLLL').format(
                     'DD/MM/YYYY'
                  ) */
                  notificationIconSize={20}
                  containerStyle={{ alignSelf: 'center' }}
                  notificationName={Type}
                  notificationDetailes={
                     Type === 'In'
                        ? `your child ${StudentName} leave the school`
                        : `your child ${StudentName} enter the school`
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
