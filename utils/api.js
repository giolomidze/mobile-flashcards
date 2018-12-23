import { AsyncStorage } from "react-native";
import { FLASH_CARD_DECKS_STORAGE_KEY } from "./_flashcards";

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(
    FLASH_CARD_DECKS_STORAGE_KEY,
    JSON.stringify({
      [key]: entry
    })
  );
}
