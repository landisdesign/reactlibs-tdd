import {
    SetRandomAction, SET_RANDOM, setRandom,
    SetStoryIndexAction, SET_STORY_INDEX, setStoryIndex,
    SetShowStoryAction, SET_SHOW_STORY, setShowStory,
    SetOutputAction, SET_OUTPUT, setOutput,
    SetShowEMailAction, SET_SHOW_EMAIL, setShowEMail,
    SetWillClearAction, SET_WILL_CLEAR, setWillClear
} from './actions';

test('SetRandomAction populated', () => {
    const expected: SetRandomAction = {
        type: SET_RANDOM,
        payload: true
    };
    const actual = setRandom(true);

    expect(actual).toEqual(expected);
});

test('SetStoryIndex populated', () => {
    const expected: SetStoryIndexAction = {
        type: SET_STORY_INDEX,
        payload: 5
    };
    const actual = setStoryIndex(5);

    expect(actual).toEqual(expected);
});

test('SetShowStory populated', () => {
    const expected: SetShowStoryAction = {
        type: SET_SHOW_STORY,
        payload: true
    };
    const actual = setShowStory(true);

    expect(actual).toEqual(expected);
});

test('SetOutputAction populated', () => {
    const expected: SetOutputAction = {
        type: SET_OUTPUT,
        payload: 'foo'
    };
    const actual = setOutput(expected.payload);

    expect(actual).toEqual(expected);
});

test('SetShowEmailAction populated', () => {
    const expected: SetShowEMailAction = {
        type: SET_SHOW_EMAIL,
        payload: {
            showEMail: true,
            isTransitioning: false
        }
    };
    const actual = setShowEMail(true, false);

    expect(actual).toEqual(expected);
});

test('SetWillClearAction populated', () => {
    const expected: SetWillClearAction = {
        type: SET_WILL_CLEAR,
        payload: true
    };
    const actual = setWillClear(true);

    expect(actual).toEqual(expected);
});
