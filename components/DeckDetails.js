import React from 'react';
import {
  AsyncStorage,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries } from '../actions';
import { white, purple, gray } from '../utils/colors';

class DeckDetails extends React.Component {
  render() {
    const { deck } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>{this.props.decks[deck].title}</Text>
        <Text style={styles.countContainer}>
          {this.props.decks[deck].questions.length} cards
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate('AddQuestion', {
              deck,
            })
          }
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { decks } = state;
  console.log('decks', decks);

  return {
    state,
    isLoading: typeof decks === 'undefined',
    decks,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
    color: gray,
  },
});

export default connect(mapStateToProps)(DeckDetails);
