import { LoadConfigAction, LOAD_CONFIG, loadConfig } from "./actions";

describe('Base action creators deliver valid payloads', () => {
    test('loadConfig', () => {
        const expected: LoadConfigAction = {
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
    test.todo('loadStories');
    test.todo('loadWord');
    test.todo('reconcileConfig');
    test.todo('applicationReady');
});

describe('fetchConfig retrieves and creates config', () => {
    test.todo('fetches config URLs and dispatches initConfig');
    test.todo('fetches stories and words and dispatches loadWords/loadStory properly');
    test.todo('delays reconciliation for at least as long as minDelay');
    test.todo('does not delay if minDelay <= 0');
});
