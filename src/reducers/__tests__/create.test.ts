import { BaseAction } from "..";

import { StateConverterMap, createReducer } from "../create";

interface TestState {
    foo: string;
    bar: string[];
    baz: number;
    error?: any;
}

const initialState: TestState = {
    foo: 'a',
    bar: ['x', 'y', 'z'],
    baz: 25
}

const cloneState = (state: TestState): TestState => ({
    ...state,
    bar: [...state.bar]
});

const TEST_ACTION = 'TEST_ACTION';

interface TestAction extends BaseAction {
    payload: string;
}

const buildAction = (foo: string): TestAction => ({
    type: TEST_ACTION,
    payload: foo
});

const converterMap: StateConverterMap<TestState, TestAction> = {
    [TEST_ACTION]: (state: TestState, action: TestAction): TestState => ({
        ...cloneState(state),
        foo: action.payload
    })
};

test('createReducer returns function for future tests', () => {
    const reducer = createReducer(initialState, cloneState, converterMap);

    expect(typeof reducer).toEqual('function');
});

test('Method registered with reducer for provided action is used', () => {
    const reducer = createReducer(initialState, cloneState, converterMap);
    const action = buildAction('test');

    const expected = {
        ...cloneState(initialState),
        foo: 'test'
    };
    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
    // Intentionally not testing for equality here.
    // It is the converter's responsibility to clone the state.
});

test('Action not registered with reducer returns provided state object', () => {
    const reducer = createReducer(initialState, cloneState, converterMap);
    const action = {type: 'FOO'};

    const actual = reducer(initialState, action as TestAction);
    expect(actual).toBe(initialState);
});

test('Initial state returned when no state provided', () => {
    const reducer = createReducer(initialState, cloneState, converterMap);
    const action = {type: 'FOO'};

    const actual = reducer(undefined, action as TestAction);

    expect(actual).toBe(initialState);
});

test('Error action updates state with error message', () => {
    const reducer = createReducer(initialState, cloneState, converterMap);
    const action = {
        ...buildAction('test'),
        error: true,
        payload: 'error'
    };

    const expected = {
        ...cloneState(initialState),
        error: action.payload
    };

    const actual = reducer(initialState, action);

    expect(actual).toEqual(expected);
});
