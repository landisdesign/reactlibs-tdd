import { WordList, WordRef } from '../config/state';
import { StateConverterMap, createReducer } from '../create';
import { WordsAction, INIT_WORDS, InitWordsAction } from './actions';

interface WordsMap {
    [index:string]: WordList;
}
export interface WordsState {
    readonly words: Readonly<WordsMap>;
    readonly error?: string;
};

const initialState: WordsState = {words:{}};

const cloneState = (state: WordsState): WordsState => ({
    words: {...state.words},
    error: state.error
});

const converters: StateConverterMap<WordsState, WordsAction> = {
    [INIT_WORDS]: convertInitWords
}

export const words = createReducer(initialState, cloneState, converters);

function convertInitWords(state: WordsState, action: WordsAction): WordsState {
    let lists: WordsMap = { ...state.words };
    let refs: WordRef[] = [];
    let error: string | null = null;

    for (const word of (action as InitWordsAction).payload) {
        if (word.id in lists) {
            error = error || `Word with id ${word.id} already defined`;
        }

        if ('ref' in word) {
            refs.push(word);
        }
        else {
            lists[word.id] = word;
        }
    }

    for (const ref of refs) {
        const list = lists[ref.ref];
        if (!list) {
            error = error || `Word '${ref.id}' references nonexistent word '${ref.ref}'`;
            continue;
        }

        let newWord = {
            ...ref,
            words: list.words
        };
        delete newWord.ref;

        lists[newWord.id] = newWord;
    }

    const errorProp = error ? {error} : {};

    return {
        words: lists,
        ...errorProp
    };
}
