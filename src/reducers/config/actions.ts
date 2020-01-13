import { BaseAction, ReactlibThunkAction, ReactlibThunkDispatch } from "..";
import { ConfigUrls, Story, WordRef, WordList, WordJSON } from "./state";
import { sleep, arraysEqual } from "../../common";

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
        readonly word: WordJSON;
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

export const loadWord = (word: WordJSON, index: number): LoadWordAction => ({
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
        const start = Date.now();
        const configErrorTemplate = loadConfig({storySource: '', wordSources: []});

        let configData: ConfigUrls;
        try {
            configData = await fetchData(configUrl, getConfigStructureErrors, configErrorTemplate);
        }
        catch (e) {
            dispatch(e);
            return;
        }

        dispatch(loadConfig(configData as ConfigUrls));

        let fetches = configData.wordSources.map((wordSource, index) => fetchWordConfig(dispatch, wordSource, index));
        fetches.push(fetchStoryConfig(dispatch, configData.storySource));

        const initialDelay = Date.now() - start;
        if (initialDelay < minDelay) {
            fetches.push(createDelay(minDelay - initialDelay));
        }

        try {
            await Promise.all(fetches);
            return dispatch(reconcileConfig());
        }
        catch (error) {
            return dispatch(error);
        }
    };
}

async function fetchWordConfig(dispatch: ReactlibThunkDispatch, wordSource: string, index: number) {
    const errorActionTemplate = loadWord({} as WordJSON, index);
    const wordData = await fetchData(wordSource, getWordStructureErrors, errorActionTemplate);
    dispatch(loadWord(wordData as WordJSON, index));
}

async function fetchStoryConfig(dispatch: ReactlibThunkDispatch, storySource: string) {
    const errorActionTemplate = loadStories([]);

    const storyData = await fetchData(storySource, getStoryStructureErrors, errorActionTemplate);
    dispatch(loadStories(storyData as Story[]));
}

async function createDelay(delay: number) {
    await sleep(delay);
}

/**
 * Return the properly formed object represented by the JSON found at the
 * provided URL. If the JSON is malformed or unavailable, or the JSON doesn't
 * pass structural validation to verify it matches the requested type, this
 * function throws a Redux action, to be dispatched by the calling function.
 *
 * @param url The URL to retrieve the object's JSON representation
 * @param structureChecker The function to ensure the JSON matches the expected
 *        object's type structure
 * @param actionTemplate A representation of the action to be fired in case of
 *        an error
 * @throws The error action to be dispatched instead of the expected action
 */
async function fetchData<T>(url: string, structureChecker: StructureValidator, actionTemplate: BaseAction): Promise<T> {

    let response;
    try {
        response = await fetch(url);
    }
    catch (networkError) {
        throw errorAction(actionTemplate, networkError?.message);
    }
    if (!response.ok) {
        throw errorAction(actionTemplate, `${response.url} returned ${response.status}`);
    }

    let data: T;
    try {
        data = await response.json();
    }
    catch (syntaxError) {
        throw errorAction(actionTemplate, syntaxError?.message);
    }

    const structureError = structureChecker(data);
    if (structureError) {
        throw errorAction(actionTemplate, structureError);
    }

    return data;
}

const errorAction = <T extends BaseAction>(originalAction: T, errorData: any): T => ({
    ...originalAction,
    payload: errorData,
    error: true
});

interface StructureValidator {
    (incomingData: any): string | undefined;
}

const getConfigStructureErrors: StructureValidator = (incomingData: any) => {
    const validConfigStructure: ConfigUrls = {
        storySource: '',
        wordSources: ['']
    };

    return getObjectStructureErrors('ConfigUrls', '', validConfigStructure, incomingData);
}

const getWordStructureErrors: StructureValidator = (incomingData: any) => {

    const commonData = {
        id: '',
        title: ''
    }
    const helpStructure = 'help' in incomingData ? { help: '' } : {};

    if ('ref' in incomingData) {
        const testStructure: WordRef = {
            ...helpStructure,
            ...commonData,
            ref: ''
        };
        return getObjectStructureErrors('WordRef', '', testStructure, incomingData);
    }
    else {
        const testStructure: WordList = {
            ...helpStructure,
            ...commonData,
            words: ['']
        };
        return getObjectStructureErrors('WordList', '', testStructure, incomingData);
    }
}

const getStoryStructureErrors: StructureValidator = (incomingArray: any) => {
    const validStoryStructure: Story[] = [{
        id: '',
        title: '',
        fields: [''],
        template: ''
    }];

    return getObjectStructureErrors('Story[]', '', validStoryStructure, incomingArray);
}

/**
 * Compare an incoming value with a valid representation of a type. If a
 * mismatch is found in any part of the invoming value, text is returned
 * describing the error.
 *
 * @param objectName Used to provide debugging information
 * @param keyName Used to identify the current member of `incomingObject`, or
 *        `''` if we're at the root level of the object
 * @param validStructure A representative object that fulfills the type contract
 * @param incomingObject The object to inspect
 * @returns A string containing the error message, or `undefined` if no error
 *          was found
 */
function getObjectStructureErrors<T>(objectName: string, keyName: string = '', validStructure: T, incomingObject: any): string | undefined {

    type Key<T> = keyof T;

    const validType = typeof validStructure;
    const incomingType = typeof incomingObject;

    if (validType !== incomingType) {
        return `${objectName}: Type mismatch: ${keyName} is supposed to be ${validType}, is ${incomingType}`;
    }

    if (validType !== 'object') {
        return;
    }

    if (Array.isArray(validStructure)) {
        return getArrayErrors(objectName, keyName, validStructure, incomingObject);
    }

    const validKeys: Key<T>[] = Object.keys(validStructure).sort() as Key<T>[];
    const incomingKeys = Object.keys(incomingObject).sort();

    if (!arraysEqual(validKeys as string[], incomingKeys)) {
        return `${objectName}: Incoming object has different fields: Expected [${validKeys.join(', ')}], received [${incomingKeys.join(', ')}]`;
    }

    const keyPrefix = keyName ? keyName + '.' : '';
    for (let key of validKeys) {
        const error = getObjectStructureErrors(objectName, keyPrefix + key, validStructure[key], incomingObject[key]);
        if (error) {
            return error;
        }
    }
}

function getArrayErrors(objectName: string, keyName: string | number, validStructure: any[], incomingArray: any[]): string | undefined {
    if (!Array.isArray(incomingArray)) {
        return `${objectName}: Expected ${keyName} to be an array`;
    }
    for (let index in incomingArray) {
        const error = getObjectStructureErrors(objectName, `${keyName}[${index}]`, validStructure[0], incomingArray[index]);
        if (error) {
            return error;
        }
    }
}
