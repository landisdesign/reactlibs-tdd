import { WordJSON } from '../config/state';
import { BaseAction } from '..';

export const INIT_WORDS = 'INIT_WORDS';

export interface InitWordsAction extends BaseAction {
    payload: WordJSON[];
}

export type WordsAction = InitWordsAction; // Maintain pattern used by multi-action reducers

export const initWords = (words: WordJSON[]): InitWordsAction => ({
    type: INIT_WORDS,
    payload: words
});
