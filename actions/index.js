export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_ENTRIES,
    decks,
  };
}

export function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    entry: entry,
  };
}

export function addQuestion(card) {
  return {
    type: ADD_QUESTION,
    card,
  };
}
