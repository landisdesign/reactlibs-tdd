import { BaseAction, ReactlibThunkAction, ReactlibThunkDispatch } from "..";
import { ConfigUrls, Word, Story } from "./state";
import { sleep } from "../../common";

export const LOAD_CONFIG = 'LOAD_CONFIG';
export const LOAD_STORIES = 'LOAD_STORIES';
export const LOAD_WORD = 'LOAD_WORD';
export const RECONCILE_CONFIG = 'RECONCILE_CONFIG';
export const APPLICATION_READY = 'APPLICATION_READY';

export interface LoadConfigAction extends BaseAction {
    readonly payload: ConfigUrls;
}

export interface LoadStoriesAction extends BaseAction {
    readonly payload: Story[];
}

export interface LoadWordAction extends BaseAction {
    readonly payload: {
        readonly word: Word;
        readonly index: number;
    };
}

export type ReconcileConfigAction = BaseAction;

export type ApplicationReadyAction = BaseAction;

export type ConfigAction = LoadConfigAction | LoadStoriesAction | LoadWordAction | ReconcileConfigAction | ApplicationReadyAction;

export const loadConfig = (config: ConfigUrls): LoadConfigAction => ({
    type: LOAD_CONFIG,
    payload: {
        storySource: config.storySource,
        wordSources: [...config.wordSources]
    }
});

export const loadStories = (stories: Story[]): LoadStoriesAction => ({
    type: LOAD_STORIES,
    payload: stories.map(story => ({
        ...story,
        fields: [...story.fields]
    }))
});

export const loadWord = (word: Word, index: number): LoadWordAction => ({
    type: LOAD_WORD,
    payload: {
        word: 'words' in word
            ? {
                ...word,
                words: [...word.words]
            }
            : { ...word },
        index
    }
});

export const reconcileConfig = (): ReconcileConfigAction => ({
    type: RECONCILE_CONFIG
});

export const applicationReady = (): ApplicationReadyAction => ({
    type: APPLICATION_READY
});

export const fetchConfig = (configUrl: string, minDelay: number): ReactlibThunkAction => {
    return async function(dispatch) {
        try {
            const start = Date.now();

            const configResponse = await fetch(configUrl);
            checkResponse(configResponse);
            const configData: ConfigUrls = await configResponse.json();
            dispatch(loadConfig(configData));

            let fetches = configData.wordSources.map((wordSource, index) => fetchWordConfig(dispatch, wordSource, index));
            fetches.push(fetchStoryConfig(dispatch, configData.storySource));

            const initialDelay = Date.now() - start;
            if (initialDelay < minDelay) {
                fetches.push(createDelay(minDelay - initialDelay));
            }

            return Promise.all(fetches).then(() => {
                return dispatch(reconcileConfig())
            });
        }
        catch (e) {
        }
    };
}

async function fetchWordConfig(dispatch: ReactlibThunkDispatch, wordSource: string, index: number) {
    const wordResponse = await fetch(wordSource);
    checkResponse(wordResponse);
    const wordData: Word = await wordResponse.json();
    dispatch(loadWord(wordData, index));
}

async function fetchStoryConfig(dispatch: ReactlibThunkDispatch, storySource: string) {
    const storyResponse = await fetch(storySource);
    checkResponse(storyResponse);
    const storyData: Story[] = await storyResponse.json();
    dispatch(loadStories(storyData));
}

async function createDelay(delay: number) {
    await sleep(delay);
}

function checkResponse(response: Response): void {
    if (!response.ok) {
        throw new Error(`${response.url} returned ${response.status}`);
    }
}
