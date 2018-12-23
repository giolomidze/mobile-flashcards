import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import AddDeck from "./components/AddDeck";
import Decks from "./components/Decks";

export default class App extends React.Component {
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

  render() {
    return (
      <View style={styles.container}>
        <AddDeck />
        <Decks decks={this.state.decks} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
