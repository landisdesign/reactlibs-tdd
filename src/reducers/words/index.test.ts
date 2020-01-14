import { WordsState, words } from "..";
import { WordsAction, initWords } from "../actions";
import { WordJSON, WordList, WordRef } from "../../config/state";

test('Initial state returned when no state provided', () => {
    const expected: WordsState = {words:{}};
    const bogusAction = { type: 'FOO' };

    const actual = words(undefined, bogusAction as WordsAction);
    expect(actual).toEqual(expected);
});

test('Provided state returned unchanged when unrecognized action provided', () => {
    const expected = {
        words: {
            'a': {
                id: 'a',
                title: 'A',
                words: ['a1', 'a2']
            }
        }
    };

    const provided = {
        words: {
            'a': { ...expected.words.a, words: [...expected.words.a.words]}
        }
    };

    const bogusAction = { type: 'FOO' };
    const actual = words(provided, bogusAction as WordsAction);
    expect(actual).toBe(provided);
    expect(actual).toEqual(expected);
});

test('Words properly loaded and refs replaced by lists', () => {
    const testWords: WordJSON[] = [
        {
            id: 'a',
            title: 'A',
            ref: 'b',
            help: 'Help A'
        },
        {
            id: 'b',
            title: 'B',
            words: ['b1', 'b2'],
            help: 'Help B'
        }
    ];

    const loadedWords = {
        a: {...(testWords[0] as WordRef), words: [...(testWords[1] as WordList).words]},
        b: {...testWords[1], words: [...(testWords[1] as WordList).words]}
    };
    delete loadedWords.a.ref;

    const expected: WordsState = {words: loadedWords};
    const action = initWords(testWords);
    const actual = words({words:{}}, action);

    expect(actual).toEqual(expected);
});

test('Faulty word setups error properly', () => {
    const testWords: WordJSON[] = [
        {
            id: 'a',
            title: 'A',
            ref: 'd',
            help: 'Help A'
        },
        {
            id: 'b',
            title: 'B',
            words: ['b1', 'b2'],
            help: 'Help B'
        }
    ];

    const loadedWords = {
        b: {...testWords[1], words: [...(testWords[1] as WordList).words]}
    };

    const expected: WordsState = {words: loadedWords, error: ''};
    const action = initWords(testWords);
    const actual = words({words:{}}, action);

    expect(actual.error).toBeTruthy();
    expect(actual.words).toEqual(expected.words);

    const testDuplicate: WordJSON[] = [
        {
            id: 'b',
            title: 'C',
            words: ['c1', 'c2'],
            help: 'Help C'
        }
    ];
    const loadedDuplicate = {
        b: {...testDuplicate[0], words: [...(testDuplicate[0] as WordList).words]}
    };
    const expectedDuplicate: WordsState = {words: loadedDuplicate, error: ''};

    const duplicateAction = initWords(testDuplicate);
    const duplicateActual = words(actual, duplicateAction);
    expect(duplicateActual.error).toBeTruthy();
    expect(duplicateActual.words).toEqual(expectedDuplicate.words);
});
