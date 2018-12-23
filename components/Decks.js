import React from "react";
import { AsyncStorage, Text } from "react-native";

export default class Decks extends React.Component {
  async componentDidMount() {
    const decks = await AsyncStorage.getItem("Decks");

    if (decks === null) {
      AsyncStorage.setItem("Decks", JSON.stringify(this.state.decks));
    }
  }

  state = {
    decks: {
      React: {
        title: "React",
        questions: [
          {
            question: "What is React?",
            answer: "A library for managing user interfaces"
          },
          {
            question: "Where do you make Ajax requests in React?",
            answer: "The componentDidMount lifecycle event"
          }
        ]
      },
      JavaScript: {
        title: "JavaScript",
        questions: [
          {
            question: "What is a closure?",
            answer:
              "The combination of a function and the lexical environment within which that function was declared."
          }
        ]
      }
    }
  };

  addDeck = deckTitle => {
    this.setState({
      decks: {
        ...this.state.decks,
        [deckTitle]: {
          title: deckTitle,
          questions: []
        }
      }
    });
  };

  render() {
    return Object.keys(this.state.decks).map(deck => {
      const { title } = this.state.decks[deck];
      return <Text key={title}>{title}</Text>;
    });
  }
}
