import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions';

function entries(state = {}, action) {
  console.log('action:', action);
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
    default:
      return state;
  }
}

export default entries;
