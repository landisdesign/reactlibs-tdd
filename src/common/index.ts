
export const assign = <T, K extends keyof T>(arg0: T, ...args: T[]): T =>
    args.reduce( (result, current) =>
        (Object.keys(current) as K[]).reduce((target, key) => {
            target[key] = current[key];
            return target;
        }, result)
    , arg0)
;
