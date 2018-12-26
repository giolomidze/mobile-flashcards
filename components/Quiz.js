import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class Quiz extends React.Component {
  render() {
    return <Text>Quiz</Text>;
  }
}

export default connect()(Quiz);
