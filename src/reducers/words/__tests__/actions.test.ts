import { InitWordsAction, INIT_WORDS, initWords } from "../actions"
import { WordList } from "../../config/state";

test('InitWordsAction created properly', () => {
    const expected: InitWordsAction = {
        type: INIT_WORDS,
        words: [
            {
                id: 'a',
                title: 'A',
                ref: 'b',
                help: 'Help A'
            },
            {
                id: 'b',
                title: 'B',
                words: ['wordB1', 'wordB2'],
                help: 'Help B'
            }
        ]
    };

    const actual = initWords(expected.words);

    expect(actual).toEqual(expected);
    expect(actual.words).not.toBe(expected.words);
    expect((actual.words[1] as WordList).words).not.toBe((expected.words[1] as WordList).words);
})
