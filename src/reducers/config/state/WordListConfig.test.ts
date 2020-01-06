import { WordListConfigData } from "./types";
import { WordListConfig } from "./WordListConfig";

const sourceData: WordListConfigData = {
    id: 'a',
    title: 'Word A',
    words: [
        'Word a1',
        'Word a2'
    ]
}

const clone = (data: WordListConfigData): WordListConfigData => ({
    ...data,
    words: [...data.words]
});

test('Constructor hydrates data', () => {
    const expected = clone(sourceData);
    const actual = new WordListConfig(expected);

    expect(actual.id).toEqual(expected.id);
    expect(actual.title).toEqual(expected.title);
    expect(actual.words).toEqual(expected.words);
    expect(actual.words).not.toBe(expected.words);

});

test('Hydrated object indicates loaded', () => {
    const expected = true;
    const actual = (new WordListConfig(sourceData)).loaded;

    expect(actual).toEqual(expected);
});

test('Cloneable', () => {
    const expected = new WordListConfig(sourceData);
    const actual = expected.clone();

    expect(actual).toEqual(expected);
    expect(actual).not.toBe(expected);
    expect(actual.words).not.toBe(expected);
});
