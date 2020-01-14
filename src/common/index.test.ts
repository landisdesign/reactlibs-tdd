import * as Common from '../index';

describe('arraysEqual', () => {
    test('simple comparison', () => {
        let testA: any[] = [];
        let testB: any[] = [];
        let actual = Common.arraysEqual(testA, testB);
        expect(actual).toBe(true);

        testA = ['a'];
        testB = ['a'];
        actual = Common.arraysEqual(testA, testB);
        expect(actual).toBe(true);

        testA = [];
        testB = ['a'];
        actual = Common.arraysEqual(testA, testB);
        expect(actual).toBe(false);

        testA = ['a'];
        testB = ['b'];
        actual = Common.arraysEqual(testA, testB);
        expect(actual).toBe(false);

        testA = ['a'];
        testB = ['a', 'a'];
        actual = Common.arraysEqual(testA, testB);
        expect(actual).toBe(false);

        testA = ['a', 'a'];
        testB = ['a', 'b'];
        actual = Common.arraysEqual(testA, testB);
        expect(actual).toBe(false);

        testA = ['a', 'a'];
        testB = ['a', 'a'];
        actual = Common.arraysEqual(testA, testB);
        expect(actual).toBe(true);
    });

    test('complex comparison', () => {
        interface Foo {
            foo: string;
        }

        let testA:Foo[] = [{foo: 'a'}];
        let testB:Foo[] = [{foo: 'a'}];
        let actual = Common.arraysEqual(testA, testB, (a, b) => a.foo === b.foo);
        expect(actual).toBe(true);

        testA = [{foo: 'a'}];
        testB = [{foo: 'b'}];
        actual = Common.arraysEqual(testA, testB, (a, b) => a.foo === b.foo);
        expect(actual).toBe(false);
    });
});

describe('assign', () => {

    interface TestObject {
        foo?: string;
        bar?: boolean;
        baz?: number;
    }

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
