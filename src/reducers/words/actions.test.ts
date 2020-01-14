import { InitWordsAction, INIT_WORDS, initWords } from './actions'

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
})
