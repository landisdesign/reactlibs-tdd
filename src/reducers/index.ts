import { combineReducers } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { config } from './config';
import { entries } from './entries';
import { stories } from './stories';
import { ui } from './ui';
import { words } from './words';

export const index = combineReducers({
    config,
    entries,
    stories,
    ui,
    words
});

export type ReduxState = ReturnType<typeof index>;

export interface BaseAction {
    type: string;
    payload?: any;
    meta?: any;
    error?: boolean;
}

export type ReactlibThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, null, BaseAction>;

export type ReactlibThunkDispatch = ThunkDispatch<ReduxState, null, BaseAction>;
