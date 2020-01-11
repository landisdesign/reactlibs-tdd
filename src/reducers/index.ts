import { ThunkAction, ThunkDispatch } from "redux-thunk";

export interface StateConverter<S, A extends BaseAction> {
    (source: S, action: A): S;
}

export interface StateConverterMap<S, A extends BaseAction> {
    [index: string]: StateConverter<S, A>;
}

export interface Reducer<S, A extends BaseAction> {
    (state: S, action: A): S;
}

export const createReducer = <S, A extends BaseAction>(
    initialState: S,
    cloneState: (state: S) => S,
    converters: StateConverterMap<S,A>
): Reducer<S,A> =>

    (state: S = initialState, action: A): S => {
        const converter = converters[action.type];
        if (converter) {
            if (action.error) {
                return {
                    ...cloneState(state),
                    error: action.payload
                };
            }
            else {
                return converter(state, action);
            }
        }
        else {
            return state;
        }
    }
;

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
