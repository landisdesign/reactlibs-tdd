import * as Common from './index';

interface TestObject {
    foo?: string;
    bar?: boolean;
    baz?: number;
}

describe('assign', () => {

    test('Single object returns object', () => {
        const expected: TestObject = {
            foo: 'Test',
            bar: true,
            baz: 42
        };

        const actual = Common.assign(expected);
        expect(actual).toEqual(expected);
        expect(actual).toBe(expected);
    });

    test('Objects merge right to left, returning first object', () => {
        const firstObject: TestObject = {
            foo: 'Test',
            bar: true,
            baz: 42
        };
        const secondObject: TestObject = {
            foo: 'TestSecond',
        };
        const thirdObject: TestObject = {
            baz: 16
        };
        const expected = {
            foo: secondObject.foo,
            bar: firstObject.bar,
            baz: thirdObject.baz,
        };

        const actual = Common.assign(firstObject, secondObject, thirdObject);

        expect(actual).toEqual(expected);
        expect(actual).toBe(firstObject);
    });
});

describe('sleep', () => {
    test('sleep pauses execution for determined amount', async () => {
        const delay = 2000;
        const expectedEnd = Date.now() + delay;
        await Common.sleep(delay);
        const slush = Math.abs(Date.now() - expectedEnd);
        expect(slush).toBeLessThanOrEqual(10);
    })
})
