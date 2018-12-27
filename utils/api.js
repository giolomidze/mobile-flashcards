import { AsyncStorage } from 'react-native';
import { FLASH_CARD_DECKS_STORAGE_KEY } from './_flashcards';

// TODO: remove unnecessary "awaits"

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(
    FLASH_CARD_DECKS_STORAGE_KEY,
    JSON.stringify({
      [key]: entry,
    })
  );
}
function setDummyData() {
  let dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
  };

  AsyncStorage.setItem(FLASH_CARD_DECKS_STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

export function formatDecksResults(results) {
  return results === null ? setDummyData() : JSON.parse(results);
}

export function getDecks() {
  return AsyncStorage.getItem(FLASH_CARD_DECKS_STORAGE_KEY).then(
    formatDecksResults
  );
}

export function getDeck(deckId) {
  // const decks = getDecks();
  // return decks[deckId];

  return getDecks().then(decks => {
    return decks[deckId];
  });
}

export function saveDeckTitle(deckTitle) {
  return AsyncStorage.mergeItem(
    FLASH_CARD_DECKS_STORAGE_KEY,
    JSON.stringify({
      [deckTitle]: {
        title: deckTitle,
        questions: [],
      },
    })
  );
}

export function addCardToDeck(deckTitle, card) {
  getDecks().then(decks => {
    console.log('api decks:', decks);
    console.log('deckTitle:', deckTitle);
    console.log('card:', card);
    console.log('deck:', decks[deckTitle.title]);
    decks[deckTitle.title].questions.push(card);
    AsyncStorage.setItem(FLASH_CARD_DECKS_STORAGE_KEY, JSON.stringify(decks));
  });
  // return AsyncStorage.mergeItem(
  //   FLASH_CARD_DECKS_STORAGE_KEY,
  //   JSON.stringify({
  //     [deckTitle.title]: {
  //       questions: [card],
  //     },
  //   })
  // );
}

export function removeDeckFromStorage(key) {
  return AsyncStorage.getItem(FLASH_CARD_DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(FLASH_CARD_DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}

// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
