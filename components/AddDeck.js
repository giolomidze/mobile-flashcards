import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { purple, white, blue } from '../utils/colors';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { saveDeckTitle } from '../utils/api';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>Create Deck</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends React.Component {
  state = {
    deckTitle: '',
  };

  submit = () => {
    Keyboard.dismiss();
    this.props.dispatch(addEntry(this.state.deckTitle));
    saveDeckTitle(this.state.deckTitle).then(() => {
      this.props.navigation.navigate('DeckDetails', {
        deck: this.state.deckTitle,
      });
    });
  };

  onChange = input => {
    this.setState({
      deckTitle: input,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.questionText}>
          What is the title of your new deck?
        </Text>
        <TextInput style={styles.input} onChangeText={this.onChange} />
        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: blue,
    borderWidth: 1,
    padding: 10,
  },
  questionText: {
    fontSize: 22,
    textAlign: 'center',
  },
});
export default connect()(AddDeck);
