import { setEntry, setEntries, clearEntries, initEntries } from "../actions";
import { entries } from "..";
import { Story } from "../../config/state";

const empty5 = (new Array(5)).fill('');
const filled5 = ['a', 'b', 'c', 'd', 'e'];

test('Initial state returned', () => {
    const expected: string[] = [];
    const bogusAction = {type: 'FOO'};

    const actual = entries(undefined, bogusAction);
    expect(actual).toEqual(expected);
});

test('Entry is properly set', () => {
    const initial = [...empty5];
    let expected = [...initial];
    expected[2] = 'foo';

    const action = setEntry('foo', 2);
    const actual = entries(initial, action);

    expect(actual).toEqual(expect);
    expect(actual).not.toBe(initial);
});

test('All entries are replaced', () => {
    const initial = [...empty5];
    const newEntries = [...filled5];
    const expected = [...newEntries];

    const action = setEntries(newEntries);
    const actual = entries(initial, action);

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initial);
});

test('All entries are cleared', () => {
    const initial = [...filled5];
    const expected = [...empty5];

    const action = clearEntries();
    const actual = entries(initial, action);

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initial);
});

test('Entries replaced with new array of empty strings long enough to accommodate provided story', () => {
    const initial = [...filled5];
    const expected = (new Array(3)).fill('');
    const testStory: Story = {
        id: 'a',
        title: 'A',
        fields: ['WordA', 'WordB', 'WordC'],
        template: 'A'
    };

    const action = initEntries(testStory);
    const actual = entries(initial, action);

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initial);
});
