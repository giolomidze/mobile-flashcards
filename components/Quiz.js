import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

class Quiz extends React.Component {
  state = {
    currentCard: 0,
    showAnswer: false,
    questionLength: 0,
    answerLog: {},
    quizCompleted: false,
  };
  componentDidMount() {
    console.log(this.props.deck.questions);
    console.log('question: ', this.state.currentCard);
    this.setState({
      questionLength: this.props.deck.questions.length,
    });
  }

  nextQuestion = () => {
    const { currentCard: currentQuestion, questionLength } = this.state;

    const incrementedQuestion = currentQuestion + 1;

    if (incrementedQuestion < questionLength) {
      this.setState(state => ({
        currentCard: state.currentCard + 1,
        showAnswer: false,
      }));
    } else {
      this.setState({
        quizCompleted: true,
      });
    }
  };

  correct = () => {
    this.setState({
      answerLog: Object.assign(
        { [this.state.currentCard]: 'correct' },
        this.state.answerLog
      ),
    });
    this.nextQuestion();
  };

  incorrect = () => {
    this.setState({
      answerLog: Object.assign(
        { [this.state.currentCard]: 'incorrect' },
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

  restartQuiz = () => {
    this.setState({
      currentCard: 0,
      showAnswer: false,
      answerLog: {},
      quizCompleted: false,
    });
  };

  render() {
    const { deck } = this.props;
    const { questions: cards } = deck;
    const { currentCard, questionLength, showAnswer } = this.state;
    console.log('deck: ', deck);

    if (this.state.quizCompleted) {
      clearLocalNotification().then(setLocalNotification);
      const correctAnswers = Object.values(this.state.answerLog).filter(
        value => value === 'correct'
      ).length;

      return (
        <View>
          <Text>Quiz Completed</Text>
          <Text>Correct answers: {correctAnswers}</Text>
          <TouchableOpacity onPress={this.restartQuiz}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigate('DeckDetails', {
                deck: deck.title,
              })
            }
          >
            <Text>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Current question: {currentCard + 1}</Text>
          <Text>Total questions:{questionLength}</Text>
          {!showAnswer ? (
            <Text>{cards[currentCard].question}</Text>
          ) : (
            <Text>{cards[currentCard].answer}</Text>
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
}

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params;
  return {
    state,
    deck,
    navigate: navigation.navigate,
  };
}

export default connect(mapStateToProps)(Quiz);
