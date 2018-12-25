import React from 'react';
import {
  AsyncStorage,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { getDecks } from '../utils/api';
import { FLASH_CARD_DECKS_STORAGE_KEY } from '../utils/_flashcards';

export default class Decks extends React.Component {
  state = {
    decks: {},
    isLoading: true,
  };

  componentDidMount() {
    getDecks().then(decks => {
      this.setState({
        decks,
        isLoading: false,
      });
    });
  }

  render() {
    console.log('local decks', this.state.decks);
    const { decks, isLoading } = this.state;
    return (
      <ScrollView>
        {!isLoading && Object.keys(this.state.decks).length < 1 ? (
          <Text>0 Decks</Text>
        ) : (
          Object.keys(decks).map(deck => {
            const { title, questions } = decks[deck];
            return (
              <TouchableOpacity
                key={title}
                style={styles.button}
                onPress={() =>
                  this.props.navigation.navigate('DeckDetails', {
                    deck,
                  })
                }
              >
                <Text>{title}</Text>
                <Text>{questions.length} cards</Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
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
  },
  countText: {
    color: '#FF00FF',
  },
});
