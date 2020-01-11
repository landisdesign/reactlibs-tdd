import { BaseAction } from "..";
import { Story } from "../config/state";

export const INIT_STORIES = 'INIT_STORIES';

export interface InitStoriesAction extends BaseAction {
    payload: Story[];
}

export type StoriesAction = InitStoriesAction; // maintain pattern used in other reducers for future use

export const initStories = (stories: Story[]): InitStoriesAction => ({
    type: INIT_STORIES,
    payload: stories.map(story => ({...story, fields: [...story.fields]}))
});
