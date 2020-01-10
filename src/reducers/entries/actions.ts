import { BaseAction } from "..";
import { Story } from "../config/state";

export const SET_ENTRY = 'SET_ENTRY';
export const SET_ENTRIES = 'SET_ENTRIES';
export const CLEAR_ENTRIES = 'CLEAR_ENTRIES';
export const INIT_ENTRIES = 'INIT_ENTRIES';

export interface SetEntryAction extends BaseAction {
    payload: {
        entry: string;
        index: number;
    }
}

export interface SetEntriesAction extends BaseAction {
    payload: string[];
}

export type ClearEntriesAction = BaseAction;

export interface InitEntriesAction extends BaseAction {
    payload: number;
}

export type EntryAction = SetEntryAction | SetEntriesAction | ClearEntriesAction | InitEntriesAction;

export const setEntry = (entry: string, index: number): SetEntryAction => ({
    type: SET_ENTRY,
    payload: {
        entry,
        index
    }
});

export const setEntries = (entries: string[]): SetEntriesAction => ({
    type: SET_ENTRIES,
    payload: [...entries]
});

export const clearEntries = (): ClearEntriesAction => ({
    type: CLEAR_ENTRIES
});

export const initEntries = (story: Story): InitEntriesAction => ({
    type: INIT_ENTRIES,
    payload: story.fields.length
});
