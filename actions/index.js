export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';
export const ADD_QUESTION = 'ADD_QUESTION';
export const REMOVE_DECK = 'REMOVE_DECK';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_ENTRIES,
    decks,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_ENTRY,
    deck,
  };
}

export function addQuestion(card) {
  return {
    type: ADD_QUESTION,
    card,
  };
}

export function removeDeck(deck) {
  return {
    type: REMOVE_DECK,
    deck,
  };
}
