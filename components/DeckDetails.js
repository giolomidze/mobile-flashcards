import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { gray } from '../utils/colors';
import { getDeck } from '../utils/api';
import { connect } from 'react-redux';

class DeckDetails extends React.Component {
  state = {
    deck: {
      title: '',
      question: [],
    },
    isLoading: true,
  };

  async componentDidMount() {
    const deckId = this.props.navigation.state.params.deck;
    getDeck(deckId).then(deck => {
      this.setState({
        isLoading: typeof deck.questions.length < 1,
        deck,
      });
    });
  }

  render() {
    const { deck, isLoading } = this.props;

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        {!isLoading && (
          <Text style={styles.countContainer}>
            {deck.questions.length} cards
          </Text>
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
          style={styles.button}
          onPress={() =>
            this.props.navigation.navigate('Quiz', {
              deck,
            })
          }
        >
          <Text>Start Quiz</Text>
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
  countContainer: {
    alignItems: 'center',
    padding: 10,
    color: gray,
  },
});

function mapStateToProps(state, { navigation }) {
  const { decks } = state;
  const deckId = navigation.state.params.deck;
  console.log(decks);
  return {
    isLoading: typeof decks === 'undefined',
    deck: decks[deckId],
  };
}

export default connect(mapStateToProps)(DeckDetails);
