import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { LOAD_CONFIG, LOAD_STORIES, LOAD_WORD, RECONCILE_CONFIG, APPLICATION_READY, loadConfig, loadStories, loadWord, reconcileConfig, applicationReady, fetchConfig, ConfigAction } from "./actions";
import { WordList } from "./state";
import { AnyAction } from 'redux';
import { sleep } from '../../common';

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
            payload: [
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
        };

        const actual = loadStories(expected.payload);

        expect(actual).toEqual(expected);
        expect(actual.payload).not.toBe(expected.payload);
        actual.payload.forEach((story, i) => {
            expect(story.fields).not.toBe(expected.payload[i].fields);
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

describe('fetchConfig retrieves config and dispatches', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    interface StringMap {
        [index:string]: string
    }

    const responsesData: StringMap = {
        'config.json': '{ "storySource": "stories.json", "wordSources": ["wordA.json", "wordB.json"] }',
        'stories.json': '[{ "id": "story-a", "title": "Story A", "fields": ["wordA", "wordB"], "template": "Template A" }]',
        'wordA.json': '{ "id": "wordA", "title": "Word A", "words": ["A1", "A2"] }',
        'wordB.json': '{ "id": "wordB", "title": "Word B", "ref": "wordA", "help": "Help B" }'
    };

    const expectedStartAction: ConfigAction = loadConfig(JSON.parse(responsesData['config.json']));
    const expectedDataActions: ConfigAction[] = [
        loadStories(JSON.parse(responsesData['stories.json'])),
        loadWord(JSON.parse(responsesData['wordA.json']), 0),
        loadWord(JSON.parse(responsesData['wordB.json']), 1)
    ];
    const expectedEndActions: ConfigAction[] = [
        reconcileConfig()
    ];

    const getResponse = (responseValues: StringMap) => async (req: Request) => {
        const urlMatch = /([^/]+\.json)$/.exec(req.url);
        const responseData = urlMatch && responseValues[urlMatch[1]];
        await sleep(250);
        return responseData ?? Promise.reject(new Error(`Url ${req.url} not found`));
    };

    beforeEach(() => {
        global.fetch.resetMocks();
        global.fetch.mockResponse(getResponse(responsesData));
    });

    test('fetches URLs and dispatches proper actions', async () => {
        const store = mockStore({});
        await store.dispatch((fetchConfig('config.json', 0) as unknown) as AnyAction) // applying thunk doesn't apply ThunkAction union in mock
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(expectedStartAction);
                expect(actions.slice(1, 1 + expectedDataActions.length)).toEqual(expect.arrayContaining(expectedDataActions));
                expect(actions[actions.length - 1]).toEqual(expectedEndActions[0]);
            })
        ;
    });

    test('delays reconciliation for at least as long as minDelay', async () => {
        const store = mockStore({});
        const delay = 1000;
        const now = Date.now();
        const expectedTime = now + delay;
        const slush = 10;
        await store.dispatch((fetchConfig('config.json', delay) as unknown) as AnyAction)
            .then(() => {
                const end = Date.now();
                const timeFromExpected = Math.abs(end - expectedTime);
                expect(timeFromExpected).toBeLessThanOrEqual(slush);
            })
        ;
    });

    test('Errors on bad config JSON', async () => {
        const badResponses = {
            ...responsesData,
            'config.json': '{ "storySources": "stories.json", "wordSources": ["wordA.json", "wordB.json"] }' // storySource misspelled
        };

        global.fetch.resetMocks();
        global.fetch.mockResponse(getResponse(badResponses));

        const store = mockStore({});
        await store.dispatch((fetchConfig('config.json', 0) as unknown) as AnyAction)
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].error).toEqual(true);
            })
        ;
    });

    test('Errors on bad story JSON', async () => {
        const badResponses = {
            ...responsesData,
            'stories.json': '[{ "id": "story-a", "title": "Story A", "fields": ["wordA", "wordB"], "template": "Template A" ' // missing closing bracket/brace
        };

        global.fetch.resetMocks();
        global.fetch.mockResponse(getResponse(badResponses));

        const store = mockStore({});
        await store.dispatch((fetchConfig('config.json', 0) as unknown) as AnyAction)
            .then(() => {
                store.getActions().forEach(action => {
                    if (action.type === LOAD_STORIES) {
                        expect(action.error).toBe(true);
                    }
                    else {
                        expect(action.error).toBeUndefined();
                    }
                });
            })
        ;
    });

    test('Errors on bad word JSON', async () => {
        const badResponses = {
            ...responsesData,
            'wordA.json': '{ "id": "wordA", "title": "Word A", "ref": ["A1", "A2"] }', // invalid ref, should be string
        };

        global.fetch.resetMocks();
        global.fetch.mockResponse(getResponse(badResponses));

        const store = mockStore({});
        await store.dispatch((fetchConfig('config.json', 0) as unknown) as AnyAction)
            .then(() => {
                store.getActions().forEach(action => {
                    if (action.type === LOAD_WORD) {
                        if (action.payload.index === 1) {
                            expect(action.error).toBeUndefined();
                        }
                        else {
                            expect(action.error).toBe(true);
                        }
                    }
                    else {
                        expect(action.error).toBeUndefined();
                    }
                });
            })
        ;
    });
});
