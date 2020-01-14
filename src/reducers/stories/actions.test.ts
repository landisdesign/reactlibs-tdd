import { InitStoriesAction, INIT_STORIES, initStories } from "../actions";

test('InitStoriesAction properly built', () => {
    const expected: InitStoriesAction = {
        type: INIT_STORIES,
        payload: [
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
        ]
    };

    const actual = initStories(expected.payload);

    expect(actual).toEqual(expected);
});
