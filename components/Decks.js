import React from 'react';
import { AsyncStorage, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries } from '../actions';
import { white, purple } from '../utils/colors';

class Decks extends React.Component {
  state = {
    decks: {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces',
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event',
          },
        ],
      },
      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer:
              'The combination of a function and the lexical environment within which that function was declared.',
          },
        ],
      },
    },
  };

  async componentDidMount() {
    this.props.dispatch(receiveEntries(this.state.decks));
    const decks = await AsyncStorage.getItem('Decks');

    if (decks === null) {
      AsyncStorage.setItem('Decks', JSON.stringify(this.state.decks));
    }
  }

  render() {
    return (
      !this.props.isLoading &&
      Object.keys(this.props.decks).map(deck => {
        const { title, questions } = this.props.decks[deck];
        return (
          <TouchableOpacity key={title} style={styles.button}>
            <Text>{title}</Text>
            <Text>{questions.length} cards</Text>
          </TouchableOpacity>
        );
      })
    );
  }
}

function mapStateToProps(state) {
  const { decks } = state;
  console.log(state);

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
  },
  countText: {
    color: '#FF00FF',
  },
});

export default connect(mapStateToProps)(Decks);
