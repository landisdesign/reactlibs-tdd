import { Story } from "../config/state";
import { StateConverterMap, createReducer } from "../create";
import { StoriesAction, INIT_STORIES } from "./actions";

interface IDMap {
    [index: string]: number;
}

interface MutableStoriesState {
    idMap: IDMap;
    stories: Story[];
}

export interface StoriesState {
    readonly idMap: Readonly<IDMap>;
    readonly stories: Readonly<Story>[];
}

const initialState: StoriesState = {
    idMap: {},
    stories: []
};

const cloneState = (state: StoriesState) : StoriesState => ({
    idMap: {...state.idMap},
    stories: state.stories.map(story => ({...story, field: [...story.fields]}))
});

const converters:StateConverterMap<StoriesState, StoriesAction> = {
    [INIT_STORIES]: convertInitStories
}

export const stories = createReducer(initialState, cloneState, converters);

function convertInitStories(state: StoriesState, action: StoriesAction): StoriesState {
    const newState: MutableStoriesState = action.payload.reduce((mutableState, story, index) => {
        mutableState.idMap[story.id] = index;
        mutableState.stories[index] = {...story, fields: [...story.fields]};
        return mutableState;
    }, ({idMap:{}, stories: new Array(action.payload.length)} as MutableStoriesState));

    return newState;
}
