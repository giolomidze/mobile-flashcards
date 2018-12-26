import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';

class Decks extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    getDecks().then(decks => dispatch(receiveDecks(decks)));
  }

  render() {
    return (
      <ScrollView>
        {!this.props.isLoading &&
          Object.keys(this.props.decks).map(deck => {
            const { title, questions } = this.props.decks[deck];
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
          })}
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

function mapStateToProps(state) {
  const { decks } = state;

  return {
    isLoading: typeof decks === 'undefined',
    decks,
  };
}

export default connect(mapStateToProps)(Decks);
