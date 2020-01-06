import { StoryConfigData } from './types';
import { StoryConfigList } from './StoryConfigList';

const sourceData: StoryConfigData[] = [
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
];

const clone = (source: StoryConfigData[]) => source.map(story => {
    const newStory = {...story};
    newStory.fields = [...story.fields];
    return newStory;
})

const testStoriesEqualButDifferent = (actual: StoryConfigData[], expected: StoryConfigData[]) => {
    expect(actual).not.toBe(expected);
    actual.forEach((actualStory, i) => {
        expect(actualStory).not.toBe(expected[i]);
        expect(actualStory.fields).not.toBe(expected[i].fields);
    });
}

test('Constructor hydrates data', () => {
    const expected = clone(sourceData);
    const actual = new StoryConfigList(expected);

    expect(actual.stories).toEqual(sourceData);
    testStoriesEqualButDifferent(actual.stories, expected);
});

test('Hydrated object indicates loaded', () => {
    const expected = true;
    const newObj = new StoryConfigList(sourceData);
    const actual = newObj.loaded;

    expect(actual).toEqual(expected);
});

test('Cloneable', () => {
    const expected = new StoryConfigList(sourceData);
    const actual = expected.clone();

    expect(actual).not.toBe(expected);
    expect(actual).toEqual(expected);
    testStoriesEqualButDifferent(actual.stories, expected.stories);
});
