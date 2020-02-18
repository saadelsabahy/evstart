import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CustomButton } from '../../components';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions';

export class Home extends Component {
   render() {
      const { route, onLogoutPressed } = this.props;

      return (
         <View>
            <Text> Home </Text>
            <CustomButton
               buttonTitle={'logout'}
               onButtonPressed={onLogoutPressed}
            />
         </View>
      );
   }
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps, Actions)(Home);
