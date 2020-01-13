import { BaseAction } from ".";

/**
 * Describes a function that returns a new copy of the state, modified according
 * to the content of the provided action. The returned state should be a *copy*
 * of the provided state, not updated original state.
 *
 * @param source The state to be modified
 * @param action The action that modifies the state
 * @returns An updated copy of the state
 */
export interface StateConverter<S, A extends BaseAction> {
    (source: S, action: A): S;
}

/**
 * Describes a map of StateConverters. The keys are the action types handled by
 * their associated StateConverter implementations.
 */
export interface StateConverterMap<S, A extends BaseAction> {
    [index: string]: StateConverter<S, A>;
}

/**
 * Describes the Redux reducer returned by {@link #createReducer}
 *
 * @param state The state to be cloned and updated
 * @param action The action providing the information to modify the state
 * @returns A copy of the updated state
 */
export interface Reducer<S, A extends BaseAction> {
    (state: S | undefined, action: A): S;
}

/**
 * Creates a Redux reducer that maps action types to functions that clone and
 * update the provided state. If a type is provided that isn't mapped in the
 * provided `converters` map, the state is passed through unchanged.
 *
 * @param initialState The state to be returned on initial load
 * @param cloneState A function that creates a copy of the provided state
 * @param converters A map of action types that reference StateConverters
 * @returns A reducer for the provided state and action type
 */
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
