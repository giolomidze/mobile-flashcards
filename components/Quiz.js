import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    showAnswer: false,
    questionLength: 0,
  };
  componentDidMount() {
    console.log(this.props.deck.questions);
    console.log('question: ', this.state.currentQuestion);
    this.setState({
      questionLength: this.props.deck.questions.length,
    });
  }

  nextQuestion = () => {
    const { currentQuestion, questionLength } = this.state;

    const incrementedQuestion = currentQuestion + 1;

    if (incrementedQuestion < questionLength) {
      this.setState(state => ({
        currentQuestion: state.currentQuestion + 1,
      }));
    }
  };

  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { currentQuestion, questionLength } = this.state;

    return (
      <View>
        <Text>{questions[currentQuestion].question}</Text>
        <Text>{questions[currentQuestion].answer}</Text>
        <TouchableOpacity>
          <Text onPress={this.nextQuestion}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Incorrect</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params;
  return {
    state,
    deck,
  };
}

export default connect(mapStateToProps)(Quiz);
