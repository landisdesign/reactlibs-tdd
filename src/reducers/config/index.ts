import { ConfigState, ConfigUrls, WordSource, Story, StorySource } from "./state";
import { ConfigAction, LOAD_CONFIG, LOAD_WORD, LOAD_STORIES, RECONCILE_CONFIG, APPLICATION_READY } from "./actions";
import { StateConverterMap, createReducer } from "../create";

const initialState: ConfigState = {
    loaded: false,
    loading: false,
    storySource: {
        url: '',
        loaded: false
    },
    wordSources: []
};

const cloneState = (state: ConfigState): ConfigState => ({...state})

const stateConverters: StateConverterMap<ConfigState, ConfigAction> = {
    [LOAD_CONFIG]: convertLoadConfig,
    [LOAD_WORD]: convertLoadWord,
    [LOAD_STORIES]: convertLoadStory,
    [RECONCILE_CONFIG]: convertReconcileConfig,
    [APPLICATION_READY]: convertApplicationReady
};

export const config = createReducer(initialState, cloneState, stateConverters);

function convertLoadConfig(state: ConfigState, action: ConfigAction) {

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

    const {
        word,
        index
    } = action.payload;

    if (index < 0) {
        return {
            ...state,
            error: `${index} < 0; cannot load word ${word.title}`
        };
    }
    if (index >= state.wordSources.length) {
        return {
            ...state,
            error: `${index} > ${state.wordSources.length - 1}; cannot load word ${word.title}`
        };
    }

    let wordSources:WordSource[] = [...state.wordSources];
    wordSources[index] = {...word, loaded: true};

    return {
        ...state,
        wordSources
    };
}

function convertLoadStory(state: ConfigState, action: ConfigAction) {

    const stories: Story[] = action.payload;
    return {
        ...state,
        storySource: {
            loaded: true,
            stories
        }
    };
}

function convertReconcileConfig(state: ConfigState) {
    return {
        ...state,
        loaded: true
    };
}

function convertApplicationReady(state: ConfigState) {
    return {
        ...state,
        loading: false
    };
}
