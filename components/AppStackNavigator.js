import React from 'react';
import { createStackNavigator} from 'react-navigation-stack'

import BookDonateScreen from '../screens/BookDonateScreen';

import ReceiverDetailsScreen from '../screens/ReceiverDetailsScreen';


export const AppStackNavigator = createAppNavigator({
    BookDonateList:{
        screen:BookDonateScreen,
        navavigationOptions:{
            headerShow : false
        }

    },
    ReceiverDetailsScreen:{
        screen:ReceiverDetailsScreen,
        navigationOptions:{
            headerShow : false
        },

        

    },
    
},

{
    initialRouteName: 'BookDonateList'
}

)