import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { white, purple, blue } from '../utils/colors';

class AddQuestion extends React.Component {
  state = {
    question: '',
    answer: '',
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text>Question</Text>
        <TextInput style={styles.input} onChangeText={this.onChange} />
        <Text>Answer</Text>
        <TextInput style={styles.input} onChangeText={this.onChange} />
        <TouchableOpacity>
          <Text>SUBMIT</Text>
        </TouchableOpacity>
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
    alignSelf: 'flex-end',
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
});

export default connect()(AddQuestion);
