import { SET_ENTRY, setEntry, SET_ENTRIES, setEntries, CLEAR_ENTRIES, clearEntries, INIT_ENTRIES, initEntries } from "../actions";
import { Story } from "../../config/state";

test('Entry value transmitted for index', () => {
    const expected = {
        type: SET_ENTRY,
        payload: {
            entry: 'foo',
            index: 3
        }
    };

    const actual = setEntry(expected.payload.entry, expected.payload.index);

    expect(actual).toEqual(expected);
});

test('All entries provided', () => {
    const expected = {
        type: SET_ENTRIES,
        payload: ['foo', 'bar', 'baz']
    };

    const actual = setEntries(expected.payload);

    expect(actual).toEqual(expected);
    expect(actual.payload).not.toBe(expected.payload);
});

test('All entries cleared', () => {
    const expected = {
        type: CLEAR_ENTRIES
    };

    const actual = clearEntries();

    expect(actual).toEqual(expected);
});

test('Entry length provided from story', () => {
    const testStory: Story = {
        id: 'a',
        title: 'A',
        fields: ['a', 'b', 'c'],
        template: 'A'
    };

    const expected = {
        type: INIT_ENTRIES,
        payload: testStory.fields.length
    }

    const actual = initEntries(testStory);

    expect(actual).toEqual(expected);
});
