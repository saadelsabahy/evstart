import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { NotificationCard } from '../notificationCard';
import moment from 'moment';
import { EmptyList } from '../noData';
import { MAIN_COLOR } from '../../constants/colors';

const NotificationList = ({ data, handleRefresh, refreshing }) => {
   return (
      <FlatList
         data={data}
         keyExtractor={(item, index) => `${index}`}
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
                  notificationTimeText={TimeStamp}
                  /*  notificationDateText={moment
                     .unix(TimeStamp)
                     .format('DD-MM-YYYY')} */
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
            <EmptyList iconSize={40} emptyText="No notifications yet" />
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
