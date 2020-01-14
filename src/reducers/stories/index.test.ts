import { StoriesState, stories } from '.';
import { InitStoriesAction, initStories } from './actions';

test('Initial state returned when no state provided', () => {
    const expected: StoriesState = {
        idMap: {},
        stories: []
    };
    const bogusAction = {
        type: 'FOO'
    };

    const actual = stories(undefined, bogusAction as InitStoriesAction);

    expect(actual).toEqual(expected);
});

test('Provided state passed through when bogus action provided', () => {
    const expected: StoriesState = {
        idMap: {'a': 0},
        stories: [
            {
                id: 'a',
                title: 'A',
                fields: ['a1'],
                template: 'A'
            }
        ]
    };

    const bogusAction = {
        type: 'FOO'
    };

    const actual = stories(expected, bogusAction as InitStoriesAction);

    expect(actual).toBe(expected);
});

test('Stories properly initialized', () => {
    const initial: StoriesState = {
        idMap: {},
        stories: []
    };

    const storyList = [
        {
            id: 'a',
            title: 'A',
            fields: ['a1', 'a2'],
            template: 'A'
        },
        {
            id: 'b',
            title: 'B',
            fields: ['b1', 'b2'],
            template: 'B'
        }
    ];

    const expected: StoriesState = {
        idMap: {
            'a': 0,
            'b': 1
        },
        stories: storyList
    };

    const action = initStories(storyList);
    const actual = stories(initial, action);

    expect(actual).toEqual(expected);
});
