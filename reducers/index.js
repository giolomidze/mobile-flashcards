import {
  RECEIVE_ENTRIES as RECEIVE_DECKS,
  ADD_ENTRY,
  ADD_QUESTION,
} from '../actions';

function entries(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        decks: action.decks,
      };
    case ADD_ENTRY:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.entry]: {
            title: action.entry,
            questions: [],
          },
        },
      };
    case ADD_QUESTION:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.card.deck.title]: {
            ...state.decks[action.card.deck.title],
            questions: [
              ...state.decks[action.card.deck.title].questions,
              {
                question: action.card.question,
                answer: action.card.answer,
              },
            ],
          },
        },
      };
    default:
      return state;
  }
}

export default entries;
