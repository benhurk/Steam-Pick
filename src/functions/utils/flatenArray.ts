export default function flatenArray<T>(array: T[]) {
    array.map((d) => d.keywords)
            .filter((kw) => kw != undefined)
            .flat(),
}