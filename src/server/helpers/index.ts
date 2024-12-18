export function parseToJSON<T>(doc: T): T {
    return JSON.parse(JSON.stringify(doc));
}