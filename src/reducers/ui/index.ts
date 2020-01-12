import { StateConverterMap, createReducer, StateConverter } from "../create";
import { SET_RANDOM, SET_STORY_INDEX, SET_SHOW_STORY, SET_OUTPUT, SET_WILL_CLEAR, SET_SHOW_EMAIL, UIAction, SetRandomAction, SetShowEMailAction, SetStoryIndexAction, SetShowStoryAction, SetOutputAction, SetWillClearAction } from "./actions";

export interface UIState {
    readonly isRandom: boolean;
    readonly storyIndex: number;
    readonly showStory: boolean;
    readonly output: string;
    readonly showEMail: boolean;
    readonly transitionEMail: boolean;
    readonly willClear: boolean;
}

const initialState: UIState = {
    isRandom: false,
    storyIndex: -1,
    showStory: false,
    output: '',
    showEMail: false,
    transitionEMail: false,
    willClear: false
};

const cloneState = (state: UIState): UIState => ({ ...state });

const converters: StateConverterMap<UIState, UIAction> = {
    [SET_RANDOM]: createSinglePropertyConverter<SetRandomAction>('isRandom'),
    [SET_STORY_INDEX]: createSinglePropertyConverter<SetStoryIndexAction>('storyIndex'),
    [SET_SHOW_STORY]: createSinglePropertyConverter<SetShowStoryAction>('showStory'),
    [SET_OUTPUT]: createSinglePropertyConverter<SetOutputAction>('output'),
    [SET_WILL_CLEAR]: createSinglePropertyConverter<SetWillClearAction>('willClear'),
    [SET_SHOW_EMAIL]: convertEmail
};

export const ui = createReducer(initialState, cloneState, converters);

function createSinglePropertyConverter<T extends UIAction>(propertyName: keyof UIState): StateConverter<UIState, UIAction> {
    return (state: UIState, action: UIAction): UIState => {
        return {
            ...state,
            [propertyName]: (action as T).payload
        };
    }
};

function convertEmail(state: UIState, action: UIAction): UIState {
    const {
        showEMail,
        isTransitioning
    } = (action as SetShowEMailAction).payload;

    return {
        ...state,
        showEMail,
        transitionEMail: isTransitioning
    };
}
