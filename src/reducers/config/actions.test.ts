import { LOAD_CONFIG, loadConfig, LOAD_STORIES, loadStories, LOAD_WORD, loadWord, RECONCILE_CONFIG, reconcileConfig, APPLICATION_READY, applicationReady } from "./actions";
import { WordList } from "./state";

describe('Base action creators deliver valid payloads', () => {
    test('loadConfig', () => {
        const expected = {
            type: LOAD_CONFIG,
            payload: {
                storySource: 'story.json',
                wordSources: [
                    'word1.json',
                    'word2.json'
                ]
            }
        };

        const actual = loadConfig(expected.payload);

        expect(actual).toEqual(expected);
        expect(actual.payload).not.toBe(expected.payload);
        expect(actual.payload.wordSources).not.toBe(expected.payload.wordSources);
    });

    test('loadStories', () => {
        const expected = {
            type: LOAD_STORIES,
            payload: {
                loaded: true,
                stories: [
                    {
                        id: 'a',
                        title: 'Story A',
                        fields: [ 'wordA1', 'wordA2' ],
                        template: 'Template A'
                    },
                    {
                        id: 'b',
                        title: 'Story B',
                        fields: [ 'wordB1', 'wordB2' ],
                        template: 'Template B'
                    }
                ]
            }
        };

        const actual = loadStories(expected.payload);

        expect(actual).toEqual(expected);
        expect(actual.payload).not.toBe(expected.payload);
        expect(actual.payload.stories).not.toBe(expected.payload.stories);
        actual.payload.stories.forEach((story, i) => {
            expect(story.fields).not.toBe(expected.payload.stories[i].fields);
        });
    });

    test('loadWord', () => {
        const expected1 = {
            type: LOAD_WORD,
            payload: {
                index: 1,
                word: {
                    loaded: true,
                    id: 'a',
                    words: ['word a', 'word b'],
                    title: 'Word A',
                    help: 'Help A'
                }
            }
        };

        let actual = loadWord(expected1.payload.word, 1);

        expect(actual).toEqual(expected1);
        expect(actual.payload.word).not.toBe(expected1.payload.word);
        expect((actual.payload.word as WordList).words).not.toBe((expected1.payload.word as WordList).words);

        const expected2 = {
            type: LOAD_WORD,
            payload: {
                index: 1,
                word: {
                    loaded: true,
                    id: 'a',
                    ref: 'b',
                    title: 'Word A',
                    help: 'Help A'
                }
            }
        };

        actual = loadWord(expected2.payload.word, 1);

        expect(actual).toEqual(expected2);
        expect(actual.payload.word).not.toBe(expected2.payload.word);
    });

    test('reconcileConfig', () => {
        const expected = {
            type: RECONCILE_CONFIG
        };

        const actual = reconcileConfig();

        expect(actual).toEqual(expected);
    });

    test('applicationReady', () => {
        const expected = {
            type: APPLICATION_READY
        };

        const actual = applicationReady();

        expect(actual).toEqual(expected);
    });
});

describe('fetchConfig retrieves and creates config', () => {
    test.todo('fetches config URLs and dispatches loadConfig');
    test.todo('fetches stories and words and dispatches loadWords/loadStory properly');
    test.todo('delays reconciliation for at least as long as minDelay');
    test.todo('does not delay if minDelay <= 0');
});
