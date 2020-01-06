import { ConfigUrl } from './ConfigUrl';
import { act } from 'react-dom/test-utils';

const TEST_URL = 'foobar.html';

test('Created object populated with URL', () => {
    const expected = TEST_URL;

    const testConfig = new ConfigUrl(expected);
    const actual = testConfig.configUrl;

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
    expect(actual.configUrl).toEqual(expected.configUrl);
    expect(actual.loaded).toEqual(expected.loaded);
});