export function parseToJSON<T extends ({} | undefined | null)>(arg: T | undefined | null): T {
    return (!!arg ? JSON.parse(JSON.stringify(arg)) : null);
}