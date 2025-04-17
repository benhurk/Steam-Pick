/* eslint-disable @typescript-eslint/no-unused-vars */
export default function getTopTags(entries: [string, number][]) {
    const sortedAndFiltered = entries
        .sort((a, b) => b[1] - a[1])
        .filter(([tag, count]) => count >= 3);

    const counts = new Set(sortedAndFiltered.map(([tag, count]) => count));

    const topMinCount = Math.min(...[...counts].slice(0, 2));

    return sortedAndFiltered.filter(([tag, count]) => count >= topMinCount);
}
