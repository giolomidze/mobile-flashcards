import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { gray } from '../utils/colors';
import { removeDeckFromStorage } from '../utils/api';
import { connect } from 'react-redux';
import { removeDeck } from '../actions';

class DeckDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: deck,
    };
  };

  delete = () => {
    this.props.remove().then(this.props.goBack);
  };

  shouldComponentUpdate(nextProps) {
    return typeof nextProps.deck !== 'undefined';
  }

  render() {
    const { deck, isLoading } = this.props;

    return (
      <View style={styles.container}>
        {!isLoading && (
          <View>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.countContainer}>
              {deck.questions.length} cards
            </Text>
          </View>
        )}

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

        <TouchableOpacity
          disabled={deck.questions.length < 1}
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate('Quiz', {
              deck,
            })
          }
        >
          <Text>
            {deck.questions.length > 0
              ? `Start a Quiz`
              : 'Add cards to take a quiz'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={this.delete}>
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
  deleteButton: {
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: 10,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    color: gray,
    fontSize: 22,
  },
  countContainer: {
    fontSize: 15,
    textAlign: 'center',
    alignItems: 'center',
    color: gray,
    paddingLeft: 10,
  },
});

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params;
  return {
    isLoading: typeof state.decks === 'undefined',
    deck: state.decks[deck],
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deck } = navigation.state.params;
  return {
    remove: () => {
      dispatch(removeDeck(deck));
      return removeDeckFromStorage(deck);
    },
    goBack: () => {
      navigation.navigate('Decks');
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetails);
