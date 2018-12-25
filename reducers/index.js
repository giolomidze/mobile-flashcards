import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_QUESTION } from '../actions';

function entries(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return {
        ...state,
        decks: action.entries,
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
          [action.entry.deck]: {
            ...state.decks[action.entry.deck],
            questions: [
              ...state.decks[action.entry.deck].questions,
              {
                question: action.entry.question,
                answer: action.entry.answer,
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
