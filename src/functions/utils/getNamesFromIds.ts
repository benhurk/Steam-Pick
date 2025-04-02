export default function getNamesFromIds(
    ids: number[],
    tagList: { id: number; name: string }[]
) {
    if (ids) {
        return ids
            .map((id) => tagList.find((t) => t.id === id)?.name)
            .filter((name): name is string => name !== undefined);
    }
}
