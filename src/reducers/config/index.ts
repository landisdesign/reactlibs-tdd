import { ConfigState, ConfigUrls, WordSource } from "./state";
import { ConfigAction, LOAD_CONFIG, LOAD_WORD } from "./actions";
import { DEFAULT_ACTION_TYPE, StateConverter } from "..";

export function config(state: ConfigState = initialState, action: ConfigAction): ConfigState {
    const convertState = stateConverters[action.type] ?? stateConverters[DEFAULT_ACTION_TYPE];
    return convertState(state, action);
}

const initialState: ConfigState = {
    loaded: false,
    loading: false,
    storySource: {
        url: '',
        loaded: false
    },
    wordSources: []
}

const stateConverters: {[index:string]: StateConverter<ConfigState, ConfigAction>} = {
    [DEFAULT_ACTION_TYPE]: (state) => state,
    [LOAD_CONFIG]: convertLoadConfig,
    [LOAD_WORD]: convertLoadWord
};

function convertLoadConfig(state: ConfigState, action: ConfigAction) {
    if (action.error) {
        return {
            ...cloneState(state),
            error: action.error
        };
    }

    const configUrls: ConfigUrls = action.payload;
    return {
        ...state,
        loading: true,
        storySource: {
            loaded: false,
            url: configUrls.storySource
        },
        wordSources: configUrls.wordSources.map(wordUrl => ({
            loaded: false,
            url: wordUrl
        }))
    };
}

function convertLoadWord(state: ConfigState, action: ConfigAction) {
    if (action.error) {
        return {
            ...cloneState(state),
            error: action.error
        };
    }

    const {
        word,
        index
    } = action.payload;

    if (index < 0) {
        return {
            ...cloneState(state),
            error: `${index} < 0; cannot load word ${word.title}`
        };
    }
    if (index >= state.wordSources.length) {
        return {
            ...cloneState(state),
            error: `${index} > ${state.wordSources.length - 1}; cannot load word ${word.title}`
        };
    }

    const wordSources:WordSource[] = [...state.wordSources];
    wordSources[index] = {...word, loaded: true};

    return {
        ...cloneState(state),
        wordSources
    };
}

const cloneState = (state: ConfigState): ConfigState => ({
    ...state,
    storySource: {...state.storySource},
    wordSources: state.wordSources.map(word => ({...word}))
});
