
import { StoryConfig } from './StoryConfig';

const testData = {
    id: 'foo',
    title: 'Title',
    fields: [
        'fieldA',
        'fieldB'
    ],
    template: 'Template'
};

test('Constructor hydrates data', () => {
    const expected = testData;
    const actual = new StoryConfig(testData);

    expect(actual).toEqual(expected);
    expect(actual.fields).not.toBe(expected.fields);
});

test('Cloneable', () => {
    const expected = new StoryConfig(testData);
    const actual = expected.clone();

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);
    expect(actual.fields).not.toBe(expected.fields);
});
