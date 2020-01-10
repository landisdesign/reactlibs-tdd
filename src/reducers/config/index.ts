import { ConfigState, ConfigUrls, WordSource, Story } from "./state";
import { ConfigAction, LOAD_CONFIG, LOAD_WORD, LOAD_STORIES, RECONCILE_CONFIG, APPLICATION_READY } from "./actions";
import { StateConverter } from "..";

export function config(state: ConfigState = initialState, action: ConfigAction): ConfigState {
    const convertState = stateConverters[action.type];
    if (convertState) {
        if (action.error) {
            return {
                ...cloneState(state),
                error: action.payload
            };
        }
        else {
            return convertState(state, action);
        }
    }
    else {
        return state;
    }
}

const stateConverters: {[index:string]: StateConverter<ConfigState, ConfigAction>} = {
    [LOAD_CONFIG]: convertLoadConfig,
    [LOAD_WORD]: convertLoadWord,
    [LOAD_STORIES]: convertLoadStory,
    [RECONCILE_CONFIG]: convertReconcileConfig,
    [APPLICATION_READY]: convertApplicationReady
};

const initialState: ConfigState = {
    loaded: false,
    loading: false,
    storySource: {
        url: '',
        loaded: false
    },
    wordSources: []
}

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

    const wordAdditions = 'words' in word ? { loaded: true, words: [...word.words] } : { loaded: true};
    const wordSources:WordSource[] = [...state.wordSources];
    wordSources[index] = {...word, ...wordAdditions};

    return {
        ...cloneState(state),
        wordSources
    };
}

function convertLoadStory(state: ConfigState, action: ConfigAction) {

    const stories: Story[] = action.payload;
    return {
        ...cloneState(state),
        storySource: {
            loaded: true,
            stories: stories.map(story => ({...story, fields: [...story.fields]}))
        }
    };
}

function convertReconcileConfig(state: ConfigState) {
    return {
        ...cloneState(state),
        loaded: true
    };
}

function convertApplicationReady(state: ConfigState) {
    return {
        ...cloneState(state),
        loading: false
    };
}

const cloneState = (state: ConfigState): ConfigState => ({
    ...state,
    storySource: {...state.storySource},
    wordSources: state.wordSources.map(word => ({...word}))
});
