import { ThunkAction, ThunkDispatch } from "redux-thunk";

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
