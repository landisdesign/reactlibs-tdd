import { StateConverterMap, createReducer } from '../create';
import { EntryAction, SET_ENTRY, SET_ENTRIES, CLEAR_ENTRIES, INIT_ENTRIES } from './actions';

export type EntryState = Readonly<string[]>;

const initialState: EntryState = [];

const cloneState = (state: EntryState) : EntryState => [...state];

const converters: StateConverterMap<EntryState, EntryAction> = {
    [SET_ENTRY]: convertSetEntry,
    [SET_ENTRIES]: convertSetEntries,
    [CLEAR_ENTRIES]: convertClearEntries,
    [INIT_ENTRIES]: convertInitEntries
};

export const entries = createReducer(initialState, cloneState, converters);

function convertSetEntry(state: EntryState, action: EntryAction): EntryState {
    const {
        entry,
        index
    } = action.payload;

    let newState = [...state];
    newState[index] = entry;
    return newState;
}

function convertSetEntries(state: EntryState, action: EntryAction): EntryState {
    return action.payload;
}

function convertClearEntries(state: EntryState, action: EntryAction): EntryState {
    return (new Array(state.length)).fill('');
}

function convertInitEntries(state: EntryState, action: EntryAction): EntryState {
    return (new Array(action.payload)).fill('');
}
