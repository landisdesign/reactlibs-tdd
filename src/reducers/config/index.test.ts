import { config } from '.';
import { loadConfig, loadWord, loadStories, reconcileConfig, applicationReady, ConfigAction } from './actions';
import { ConfigState, ConfigUrls, WordRef, WordList, Story } from './state';

const initialState: ConfigState = {
    loaded: false,
    loading: false,
    storySource: {
        loaded: false,
        url: ''
    },
    wordSources: []
};

const configgedState: ConfigState = {
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

    const actual = config(initialState, loadConfigAction);

    expect(actual).toEqual(expected);
});

test('replaces proper word config on LOAD_WORD', () => {

    const wordRef: WordRef = {
        id: 'wordA',
        title: 'Word A',
        ref: 'wordB'
    };
    const wordRefAction = loadWord(wordRef, 0);
    const expectedRef = {
        ...configgedState,
        wordSources: [{...wordRef, loaded: true}, configgedState.wordSources[1]]
    };

    const actualRef = config(configgedState, wordRefAction);
    expect(actualRef).toEqual(expectedRef);
    expect(actualRef.error).toBeUndefined();
    expect(actualRef).not.toBe(configgedState);

    const wordList: WordList = {
        id: 'wordB',
        title: 'Word B',
        help: 'Help B',
        words: ['wordB1', 'wordB2']
    }
    const wordListAction = loadWord(wordList, 1);
    const expectedList = {
        ...expectedRef,
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

test('replaces story config on LOAD_STORIES', () => {
    const stories: Story[] = [
        {
            id: 'a',
            title: 'Story A',
            fields: ['Word A', 'Word B'],
            template: 'Template A'
        }
    ];
    const storyAction = loadStories(stories);
    const expected = {
        ...configgedState,
        storySource: {
            loaded: true,
            stories
        }
    }

    const actual = config(configgedState, storyAction);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(configgedState);
});


test('indicates state is loaded on RECONCILE_CONFIG', () => {
    const reconcile = reconcileConfig();
    const expected = {
        ...initialState,
        loaded: true
    }
    const actual = config(initialState, reconcile);

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);
});

test('indicates state is finished loading on APPLICATION_READY', () => {
    const ready = applicationReady();
    const initial = {
        ...initialState,
        loading: true
    }
    const expected = {
        ...initialState,
        loading: false
    }
    const actual = config(initial, ready);

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initial);
});

test('passes through existing state unchanged when unrecognized action provided', () => {
    const dummyAction: ConfigAction = { type: 'FOO' };
    const expected = cloneState(initialState);
    const actual = config(expected, dummyAction);

    expect(actual).toBe(expected);
    expect(actual).toEqual(expected);
});

test('Returns error conditions from fetch-based actions', () => {
    const errorProperties = {
        payload: 'Error',
        error: true
    };

    const expected = {
        ...initialState,
        error: errorProperties.payload
    };

    const configErrorAction = {
        ...loadConfig({storySource:'', wordSources:[]}),
        ...errorProperties
    };
    let actual = config(initialState, configErrorAction);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);

    const wordErrorAction = {
        ...loadWord({id: 'a', title: 'A', ref: 'a'}, 0),
        ...errorProperties
    };
    actual = config(initialState, wordErrorAction);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);

    const storyErrorAction = {
        ...loadStories([]),
        ...errorProperties
    };
    actual = config(initialState, storyErrorAction);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);
});
