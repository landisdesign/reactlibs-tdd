import { BaseAction } from '..';

export const SET_RANDOM = 'SET_RANDOM';
export const SET_STORY_INDEX = 'SET_STORY_INDEX';
export const SET_SHOW_STORY = 'SET_SHOW_STORY';
export const SET_OUTPUT = 'SET_OUTPUT';
export const SET_SHOW_EMAIL = 'SET_SHOW_EMAIL';
export const SET_WILL_CLEAR = 'SET_WILL_CLEAR';

interface BooleanPayloadAction extends BaseAction {
    payload: boolean;
}

export type SetRandomAction = BooleanPayloadAction;

export interface SetStoryIndexAction extends BaseAction {
    payload: number;
}

export type SetShowStoryAction = BooleanPayloadAction;

export interface SetOutputAction extends BaseAction {
    payload: string;
}

export interface SetShowEMailAction extends BaseAction {
    payload: {
        showEMail: boolean;
        isTransitioning: boolean;
    }
}

export type SetWillClearAction = BooleanPayloadAction;

export type UIAction = SetRandomAction | SetStoryIndexAction | SetShowStoryAction | SetOutputAction | SetShowEMailAction | SetWillClearAction;

export const setRandom = (isRandom: boolean): SetRandomAction => ({
    type: SET_RANDOM,
    payload: isRandom
});

export const setStoryIndex = (index: number): SetStoryIndexAction => ({
    type: SET_STORY_INDEX,
    payload: index
});

export const setShowStory = (setShow: boolean): SetShowStoryAction => ({
    type: SET_SHOW_STORY,
    payload: setShow
});

export const setOutput = (output: string): SetOutputAction => ({
    type: SET_OUTPUT,
    payload: output
});

export const setShowEMail = (showEMail: boolean, isTransitioning: boolean): SetShowEMailAction => ({
    type: SET_SHOW_EMAIL,
    payload: {
        showEMail,
        isTransitioning
    }
});

export const setWillClear = (willClear: boolean): SetWillClearAction => ({
    type: SET_WILL_CLEAR,
    payload: willClear
});
