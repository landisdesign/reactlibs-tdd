import { InitWordsAction, INIT_WORDS, initWords } from "../actions"
import { WordList } from "../../config/state";

test('InitWordsAction created properly', () => {
    const expected: InitWordsAction = {
        type: INIT_WORDS,
        payload: [
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

    const actual = initWords(expected.payload);

    expect(actual).toEqual(expected);
    expect(actual.payload).not.toBe(expected.payload);
    expect((actual.payload[1] as WordList).words).not.toBe((expected.payload[1] as WordList).words);
})
