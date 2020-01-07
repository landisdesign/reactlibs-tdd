import { Config } from "./Config";
import { ConfigDataURLs, ConfigUrlData, ConfigDataJSON, StoryConfigListJSON, StoryConfigJSON, WordRefConfigJSON, ConfigProgress } from "./types";
import { StoryConfigList } from "./StoryConfigList";
import { WordRefConfig } from "./WordRefConfig";

test('Empty constructor returns unloading empty object', () => {
    const actual = new Config();
    expect(actual.loading).toEqual(false);
    expect(actual.loaded).toEqual(false);
    expect(actual.wordSources).toHaveLength(0);
    expect(actual.storySource).toEqual(null);
});

const configUrls: ConfigDataURLs = {
    storySource: 'story.json',
    wordSources: [
        'wordA.json',
        'wordB.json'
    ]
};

test('JSON constructor with config URLs returns object with ConfigUrl members', () => {

    const testForConfigUrlObject = (actual: ConfigUrlData, expectedUrl: string): void => {
        expect(actual.loaded).toEqual(false);
        expect(actual.url).toEqual(expectedUrl);
    }

    const actual = new Config(configUrls);

    testForConfigUrlObject(actual.storySource as ConfigUrlData, configUrls.storySource);
    actual.wordSources.forEach((source, i) => testForConfigUrlObject(source as ConfigUrlData, configUrls.wordSources[i]));
});

type K<T> = keyof T;
const contains = <T extends {}>(actual: T, expected: Partial<T>): void => {
    const keys: K<T>[] = Object.keys(expected) as K<T>[];
    keys.forEach(k => {
        expect(actual[k]).toEqual(expected[k]);
    })
}

const sourceData: ConfigDataJSON = {
    loaded: true,
    loading: true,
    storySource: {
        loaded: true,
        stories: [
            {
                id: 'a',
                title: 'Title A',
                fields: [
                    'field a1',
                    'field a2'
                ],
                template: 'Template A'
            },
            {
                id: 'b',
                title: 'Title B',
                fields: [
                    'field b1',
                    'field b2'
                ],
                template: 'Template B'
            }
        ]
    },
    wordSources: [
        {
            loaded: true,
            id: 'a',
            title: 'Word A',
            words: [
                'Word a1',
                'Word a2'
            ]
        },
        {
            loaded: true,
            id: 'b',
            title: 'Word B',
            ref: 'a',
            help: 'Help B'
        },
        {
            loaded: false,
            url: 'word-c.json'
        }
    ]
};

const clone = (data: ConfigDataJSON): ConfigDataJSON => ({
    ...data,
    storySource: {
        ...(data.storySource as StoryConfigListJSON),
        stories: (data.storySource as StoryConfigListJSON).stories.map(x => ({...x}))
    },
    wordSources: data.wordSources.map(word => {
        const newWord = {...word};
        if ('words' in newWord) {
            newWord.words = [...newWord.words];
        }
        return newWord;
    })
})

test('JSON constructor with data returns hydrated object', () => {
    const actual = new Config(clone(sourceData));

    contains(actual, sourceData as Partial<Config>);
});

test('Supplying StoryConfigListData returns new Config with hydrated storySource member', () => {
    let data = clone(sourceData);
    const stories = data.storySource ? (data.storySource as StoryConfigListJSON).stories : [];
    data = {
        ...data,
        storySource: null
    };
    const initial = new Config(data);
    const newStoryListConfig = new StoryConfigList(stories);

    const actual = initial.addStoryConfig(newStoryListConfig);

    expect(actual).not.toBe(initial);
    contains(actual, sourceData as Partial<Config>);
});

test('Supplying indexed WordSourceConfigData returns new Config with hydrated wordSource at index', () => {
    const wordSourceData: WordRefConfigJSON = {
        id: 'c',
        ref: 'a',
        title: 'Word C',
        loaded: true
    };

    const expectedData = {
        ...clone(sourceData),
        wordSources: sourceData.wordSources.map((x,i) => i == 2 ? wordSourceData : x)
    };

    const initial = new Config(sourceData);
    const wordRefConfig = new WordRefConfig(wordSourceData);

    const actual = initial.addWordConfig(wordRefConfig, 2);

    expect(actual).not.toBe(initial);
    contains(actual, expectedData as Partial<Config>);
});

test('Supplying invalid WordSource index fails', () => {
    const wordSourceData: WordRefConfigJSON = {
        id: 'c',
        ref: 'a',
        title: 'Word C',
        loaded: true
    };
    const wordRefConfig = new WordRefConfig(wordSourceData);
    const config = new Config(sourceData);

    expect(() => {
        config.addWordConfig(wordRefConfig, -1);
    }).toThrow();

    expect(() => {
        config.addWordConfig(wordRefConfig, config.wordSources.length);
    }).toThrow();
});

test('Getting progress retrieves information about which sources are loaded out of total', () => {
    const emptyConfig = new Config();
    const emptyExpected: ConfigProgress = { total: 0, current: 0};
    const emptyActual = emptyConfig.getProgress();
    expect(emptyActual).toEqual(emptyExpected);

    const newConfig = new Config(configUrls);
    const newExpected: ConfigProgress = { total: 1 + newConfig.wordSources.length, current: 0};
    const newActual = newConfig.getProgress();
    expect(newActual).toEqual(newExpected);

    const initConfig = new Config(sourceData);
    const initExpected: ConfigProgress = { total: 4, current: 3};
    const initActual = initConfig.getProgress();
    expect(initActual).toEqual(initExpected);

    const wordSourceData: WordRefConfigJSON = {
        id: 'c',
        ref: 'a',
        title: 'Word C',
        loaded: true
    };
    const wordRefConfig = new WordRefConfig(wordSourceData);

    const fullConfig = initConfig.addWordConfig(wordRefConfig, 2);
    const fullExpected: ConfigProgress = {total: 4, current: 4};
    const fullActual = fullConfig.getProgress();
    expect(fullActual).toEqual(fullExpected);
});

test('Cloneable', () => {
    const expected = new Config(sourceData);
    const actual = expected.clone();

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);
});
