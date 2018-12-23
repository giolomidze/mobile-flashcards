import React from "react";
import { Text, AsyncStorage } from "react-native";

export default class Decks extends React.Component {
  //   state = {
  //     decks: {},
  //     isLoading: true
  //   };

  componentDidMount() {
    // AsyncStorage.getItem("Decks")
    //   .then(JSON.parse)
    //   .then(result => {
    //     this.setState({ decks: result, isLoading: false });
    //   });
  }

  render() {
    return Object.keys(this.props.decks).map(deck => {
      const { title } = this.props.decks[deck];
      return <Text key={title}>{title}</Text>;
    });
  }
}
