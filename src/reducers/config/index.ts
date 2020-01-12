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

const cloneState = (state: ConfigState): ConfigState => {
    const wordSources: WordSource[] = state.wordSources.map(
        word => 'words' in word ? {...word, words: [...word.words]} : { ...word }
    );

    const storySource: StorySource = 'stories' in state.storySource
        ? { ...state.storySource, stories: state.storySource.stories.map(
                story => ({...story, fields: [...story.fields]})
            )}
        : { ...state.storySource }
    ;

    return {
        ...state,
        wordSources,
        storySource
    };
};

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
    let wordSources:WordSource[] = [...state.wordSources];
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
