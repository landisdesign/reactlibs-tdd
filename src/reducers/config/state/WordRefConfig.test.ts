import { WordRefConfigJSON } from "./types";
import { WordRefConfig } from "./WordRefConfig";

const helplessSourceData: WordRefConfigJSON = {
    id: 'a',
    ref: 'b',
    title: 'Word A'
}

const helpfulSourceData: WordRefConfigJSON = {
    id: 'b',
    ref: 'c',
    title: 'Word B',
    help: 'Help B'
}

const clone = (data: WordRefConfigJSON): WordRefConfigJSON => ({...data});

type Key = keyof WordRefConfigJSON;
const testContains = (actual: WordRefConfigJSON, expected: WordRefConfigJSON) => {
    const expectedKeys: Key[] = Object.keys(expected) as Key[];
    expectedKeys.forEach(key => expect(actual[key]).toEqual(expected[key]));
}

test('Constructor hydrates data', () => {
    let expected = clone(helplessSourceData);
    let actual = new WordRefConfig(expected);

    testContains(actual, expected);
    expect(actual.help).toBeUndefined();

    expected = clone(helpfulSourceData);
    actual = new WordRefConfig(expected);

    testContains(actual, expected);
    expect(actual.help).not.toBeUndefined();
});

test('Hydrated object indicates loaded', () => {
    let expected = true;
    let actual = (new WordRefConfig(clone(helplessSourceData))).loaded;

    expect(actual).toEqual(expected);

    actual = (new WordRefConfig(clone(helpfulSourceData))).loaded;

    expect(actual).toEqual(expected);
});

test('Cloneable', () => {
    let expected = new WordRefConfig(clone(helplessSourceData));
    let actual = expected.clone();

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);
    expect(actual.help).toBeUndefined();

    expected = new WordRefConfig(clone(helpfulSourceData));
    actual = expected.clone();

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);
    expect(actual.help).not.toBeUndefined();
});
