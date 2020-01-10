import { ThunkAction, ThunkDispatch } from "redux-thunk";

export interface StateConverter<S, A extends BaseAction> {
    (source: S, action: A): S;
}

export const DEFAULT_ACTION_TYPE = '__default__';

export interface ReduxState {

}

export interface BaseAction {
    type: string;
    payload?: any;
    meta?: any;
    error?: boolean;
}

export type ReactlibThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, null, BaseAction>;

export type ReactlibThunkDispatch = ThunkDispatch<ReduxState, null, BaseAction>;
