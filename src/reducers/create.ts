import { BaseAction } from ".";

export interface StateConverter<S, A extends BaseAction> {
    (source: S, action: A): S;
}

export interface StateConverterMap<S, A extends BaseAction> {
    [index: string]: StateConverter<S, A>;
}

export interface Reducer<S, A extends BaseAction> {
    (state: S | undefined, action: A): S;
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
