import { StateConverterMap, createReducer } from "..";
import { UIAction } from "./actions";

export interface UIState {
    isRandom: boolean;
    storyIndex: number;
    showStory: boolean;
    output: string;
    showEMail: boolean;
    transitionEMail: boolean;
    willClear: boolean;
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

};

const ui = createReducer(initialState, cloneState, converters);
