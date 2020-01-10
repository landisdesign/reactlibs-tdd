import { ConfigState, ConfigUrls, WordRef, WordList } from "./state";
import { ConfigAction, loadConfig, loadWord } from "./actions";
import { config } from ".";

const initialState: ConfigState = {
    loaded: false,
    loading: false,
    storySource: {
        loaded: false,
        url: ''
    },
    wordSources: []
};

const cloneState = (source: ConfigState): ConfigState => ({
    ...source,
    storySource: ((storySource) => ('stories' in storySource
        ? {...storySource, stories: storySource.stories.map(story => ({...story, fields: [...story.fields]}))}
        : {...storySource}
    ))(source.storySource),
    wordSources: source.wordSources.map(word => 'words' in word ? {...word, words: [...word.words]} : {...word})
});

test('populates initial state when no state is provided', () => {
    const dummyAction: ConfigAction = { type: 'FOO' };
    const actual = config(undefined, dummyAction);
    expect(actual).toEqual(initialState);
});

test('populates config URLs on LOAD_CONFIG', () => {
    const configUrls: ConfigUrls = {
        storySource: 'stories.json',
        wordSources: [
            'wordA.json',
            'wordB.json'
        ]
    };

    const priorState = cloneState(initialState);
    const loadConfigAction = loadConfig(configUrls);

    const expected: ConfigState = {
        loaded: false,
        loading: true,
        storySource: {
            loaded: false,
            url: configUrls.storySource
        },
        wordSources: configUrls.wordSources.map(wordUrl => ({
            loaded: false,
            url: wordUrl
        }))
    };

    const actual = config(priorState, loadConfigAction);

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);
});

test('replaces proper word config on LOAD_WORD', () => {
    const priorState = {
        loaded: false,
        loading: true,
        storySource: {
            loaded: false,
            url: 'stories.json'
        },
        wordSources: [
            {
                loaded: false,
                url: 'wordA.json'
            },
            {
                loaded: false,
                url: 'wordB.json'
            }
        ]
    };

    const wordRef: WordRef = {
        id: 'wordA',
        title: 'Word A',
        ref: 'wordB'
    };
    const wordRefAction = loadWord(wordRef, 0);
    const expectedRef = {
        ...cloneState(priorState),
        wordSources: [{...wordRef, loaded: true}, priorState.wordSources[1]]
    };

    const actualRef = config(priorState, wordRefAction);
    expect(actualRef).toEqual(expectedRef);
    expect(actualRef.error).toBeUndefined();
    expect(actualRef).not.toBe(priorState);

    const wordList: WordList = {
        id: 'wordB',
        title: 'Word B',
        help: 'Help B',
        words: ['wordB1', 'wordB2']
    }
    const wordListAction = loadWord(wordList, 1);
    const expectedList = {
        ...cloneState(expectedRef),
        wordSources: [expectedRef.wordSources[0], {...wordList, loaded: true}]
    };

    const actualList = config(actualRef, wordListAction);
    expect(actualList).toEqual(expectedList);
    expect(actualList.error).toBeUndefined();
    expect(actualList).not.toBe(actualRef);

    const lowWordAction = loadWord(wordList, -1);
    const actualLow = config(actualList, lowWordAction);
    expect(actualLow.error).toBeTruthy();

    const highWordAction = loadWord(wordList, actualList.wordSources.length);
    const actualHigh = config(actualList, highWordAction);
    expect(actualHigh.error).toBeTruthy();
});

test.todo('replaces story config on LOAD_STORIES');
test.todo('indicates state is loaded on RECONCILE_CONFIG');
test.todo('indicates state is finished loading on APPLICATION_READY');

test('passes through existing state unchanged when unrecognized action provided', () => {
    const dummyAction: ConfigAction = { type: 'FOO' };
    const expected = cloneState(initialState);
    const actual = config(expected, dummyAction);

    expect(actual).toBe(expected);
    expect(actual).toEqual(expected);
});
