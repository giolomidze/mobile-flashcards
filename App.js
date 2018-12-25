import React from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import AddDeck from './components/AddDeck';
import Decks from './components/Decks';
import DeckDetails from './components/DeckDetails';
import AddQuestion from './components/AddQuestion';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { white, purple, gray } from './utils/colors';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ),
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      },
    },
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: gray,
      },
    },
  },
});

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
