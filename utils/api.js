import { AsyncStorage } from 'react-native';
import { FLASH_CARD_DECKS_STORAGE_KEY } from './_flashcards';

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
    decks[deckTitle.title].questions.push(card);
    AsyncStorage.setItem(FLASH_CARD_DECKS_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function removeDeckFromStorage(key) {
  return AsyncStorage.getItem(FLASH_CARD_DECKS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(FLASH_CARD_DECKS_STORAGE_KEY, JSON.stringify(data));
  });
}
