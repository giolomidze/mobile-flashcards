import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';
import { gray } from '../utils/colors';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Quiz of ${navigation.state.params.deck.title}`,
    };
  };

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
          <Text style={styles.cardText}>
            {!showAnswer
              ? cards[currentCard].question
              : cards[currentCard].answer}
          </Text>
          <TouchableOpacity
            style={styles.answerButton}
            onPress={this.toggleShowAnswer}
          >
            <Text>{!showAnswer ? `Show Answer` : `Show Question`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.correct} style={styles.correctButton}>
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.incorrect}
            style={styles.incorrectButton}
          >
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

const styles = StyleSheet.create({
  correctButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
  },
  incorrectButton: {
    alignItems: 'center',
    backgroundColor: '#F19846',
    padding: 10,
    margin: 10,
  },
  cardText: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 22,
    padding: 10,
    margin: 10,
  },
  answerButton: {
    alignItems: 'center',
    backgroundColor: '#AFAFAF',
    padding: 10,
    margin: 10,
  },
});

export default connect(mapStateToProps)(Quiz);
