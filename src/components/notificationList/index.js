import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NotificationCard } from '../notificationCard';

const NotificationList = ({ data }) => {
   return (
      <FlatList
         data={data}
         keyExtractor={(item, index) => `${item.id}`}
         renderItem={({ item, index }) => {
            return <NotificationCard />;
         }}
      />
   );
};

export default NotificationList;
