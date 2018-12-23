import React from "react";
import { Text, AsyncStorage } from "react-native";

export default class Decks extends React.Component {
  state = {
    decks: {},
    isLoading: true
  };

  componentDidMount() {
    AsyncStorage.getItem("Decks")
      .then(JSON.parse)
      .then(result => {
        this.setState({ decks: result, isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Text>Loading</Text>;
    }

    return Object.keys(this.state.decks).map(deck => {
      const { title } = this.state.decks[deck];
      return <Text key={title}>{title}</Text>;
    });
  }
}
