import { UIState, ui } from '.';
import { UIAction, setRandom, setStoryIndex, setShowStory, setOutput, setShowEMail, setWillClear } from './actions';

const initialState: UIState = {
    isRandom: false,
    showStory: false,
    storyIndex: -1,
    output: '',
    showEMail: false,
    transitionEMail: false,
    willClear: false
};

test('Initial state returned when state not provided', () => {
    const action = { type: 'FOO' };

    const actual = ui(undefined, action as UIAction);
    expect(actual).toEqual(initialState);
});

test('Provided state returned unchanged with bogus action', () => {
    const providedState: UIState = { ...initialState, storyIndex: 5 };
    const comparisonState: UIState ={ ...providedState };
    const action = { type: 'FOO' };

    const actual = ui(providedState, action as UIAction);
    expect(actual).toBe(providedState);
    expect(actual).toEqual(comparisonState);
});

test('Random updated', () => {
    const expected: UIState = { ...initialState, isRandom: true };
    const action = setRandom(true);

    const actual = ui(initialState, action);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);
});

test('Story Index updated', () => {
    const expected: UIState = { ...initialState, storyIndex: 3 };
    const action = setStoryIndex(3);

    const actual = ui(initialState, action);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);
});

test('Show Story updated', () => {
    const expected: UIState = { ...initialState, showStory: true };
    const action = setShowStory(true);

    const actual = ui(initialState, action);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);
});

test('Output updated', () => {
    const expected: UIState = { ...initialState, output: 'foo' };
    const action = setOutput('foo');

    const actual = ui(initialState, action);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);
});

test('Show Email and Transition Email updated', () => {
    let expected: UIState = { ...initialState, showEMail: true };
    let action = setShowEMail(true, false);
    let actual = ui(initialState, action);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);

    expected = { ...initialState, transitionEMail: true };
    action = setShowEMail(false, true);
    actual = ui(initialState, action);
    expect(actual).toEqual(expected);

    action = setShowEMail(false, false);
    actual = ui(actual, action);
    expect(actual).toEqual(initialState);
});

test('Will Clear updated', () => {
    const expected: UIState = { ...initialState, willClear: true };
    const action = setWillClear(true);

    const actual = ui(initialState, action);
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);
});
