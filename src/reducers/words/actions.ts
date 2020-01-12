import { WordJSON } from '../config/state';
import { BaseAction } from '..';

export const INIT_WORDS = 'INIT_WORDS';

export interface InitWordsAction extends BaseAction {
    words: WordJSON[];
}

export type WordsAction = InitWordsAction; // Maintain pattern used by multi-action reducers

export const initWords = (words: WordJSON[]): InitWordsAction => ({
    type: INIT_WORDS,
    words: words.map(word => 'ref' in word ? {...word} : {...word, words: [...word.words]})
});
