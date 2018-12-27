import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    showAnswer: false,
    questionLength: 0,
    answerLog: {},
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
        showAnswer: false,
      }));
    }
  };

  correct = () => {
    this.setState({
      answerLog: Object.assign(
        { [this.state.currentQuestion]: 'correct' },
        this.state.answerLog
      ),
    });
    this.nextQuestion();
  };

  incorrect = () => {
    this.setState({
      answerLog: Object.assign(
        { [this.state.currentQuestion]: 'incorrect' },
        this.state.answerLog
      ),
    });
    this.nextQuestion();
  };

  toggleShowAnswer = () => {
    this.setState(state => ({
      showAnswer: !state.showAnswer,
    }));
    console.log(this.state);
  };

  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { currentQuestion, questionLength, showAnswer } = this.state;

    return (
      <View>
        <Text>
          {currentQuestion + 1} / {questionLength}
        </Text>
        {!showAnswer ? (
          <Text>{questions[currentQuestion].question}</Text>
        ) : (
          <Text>{questions[currentQuestion].answer}</Text>
        )}
        <TouchableOpacity>
          <Text onPress={this.toggleShowAnswer}>
            {!showAnswer ? `Show Answer` : `Show Question`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.correct}>
          <Text>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.incorrect}>
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
