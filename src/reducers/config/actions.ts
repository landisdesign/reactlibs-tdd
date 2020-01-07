import { BaseAction, } from "..";
import { ConfigUrls, StoryList, Word } from "./state";

export const LOAD_CONFIG = 'LOAD_CONFIG';
export const LOAD_STORIES = 'LOAD_STORIES';
export const LOAD_WORD = 'LOAD_WORD';
export const RECONCILE_CONFIG = 'RECONCILE_CONFIG';
export const APPLICATION_READY = 'APPLICATION_READY';

export interface LoadConfigAction extends BaseAction {
    readonly payload: ConfigUrls;
}

export interface LoadStoriesAction extends BaseAction {
    readonly payload: StoryList;
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
    payload: config
});

export const loadStories = (stories: StoryList): LoadStoriesAction => ({
    type: LOAD_STORIES,
    payload: stories
});

export const loadWord = (word: Word, index: number): LoadWordAction => ({
    type: LOAD_WORD,
    payload: {
        word,
        index
    }
});

export const reconcileConfig = (): ReconcileConfigAction => ({
    type: RECONCILE_CONFIG
});

export const startApplication = (): ApplicationReadyAction => ({
    type: APPLICATION_READY
});
