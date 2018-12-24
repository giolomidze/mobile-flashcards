import React from 'react';
import { AsyncStorage, Text } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries } from '../actions';

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
        const { title } = this.props.decks[deck];
        return <Text key={title}>{title}</Text>;
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

export default connect(mapStateToProps)(Decks);
