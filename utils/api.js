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

export async function getDecks() {
  return JSON.parse(await AsyncStorage.getItem(FLASH_CARD_DECKS_STORAGE_KEY));
}

export async function getDeck(deckId) {
  const decks = await getDecks();
  return await decks[deckId];
}

export async function saveDeckTitle(deckTitle) {
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

export async function addCardToDeck(deckTitle, card) {
  console.log('only title: ', deckTitle.title);
  return AsyncStorage.mergeItem(
    FLASH_CARD_DECKS_STORAGE_KEY,
    JSON.stringify({
      [deckTitle.title]: {
        questions: [card],
      },
    })
  );
}

// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
