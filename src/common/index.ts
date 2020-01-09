
export interface BinaryPredicate<T> {
    (a: T, b: T): boolean;
}


export const arraysEqual = <T extends any>(a: T[], b: T[], test: BinaryPredicate<T> = (a, b) => a === b): boolean => {
    if (a.length !== b.length) {
        return false;
    }
    return a.every((x, i) => test(x, b[i]));
};

export const assign = <T, K extends keyof T>(arg0: T, ...args: T[]): T =>
    args.reduce( (result, current) =>
        (Object.keys(current) as K[]).reduce((target, key) => {
            target[key] = current[key];
            return target;
        }, result)
    , arg0)
;

export const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
