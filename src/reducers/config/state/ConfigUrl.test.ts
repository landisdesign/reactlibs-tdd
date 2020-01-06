import { ConfigUrl } from './ConfigUrl';

const TEST_URL = 'foobar.html';

test('Created object populated with URL', () => {
    const expected = TEST_URL;

    const testConfig = new ConfigUrl(expected);
    const actual = testConfig.url;

    expect(actual).toEqual(expected);
});

test('Defined as not loaded', () => {
    const expected = false;

    const testConfig = new ConfigUrl(TEST_URL);
    const actual = testConfig.loaded;

    expect(actual).toEqual(expected);
});

test('Cloneable', () => {
    const expected = new ConfigUrl(TEST_URL);

    const actual = expected.clone();

    expect(actual).not.toBe(expected);
    expect(actual.url).toEqual(expected.url);
    expect(actual.loaded).toEqual(expected.loaded);
});
