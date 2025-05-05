/* eslint-disable @typescript-eslint/no-unused-vars */
export default function getTopTags(entries: [number, number][]) {
    const sorted = entries.sort((a, b) => b[1] - a[1]);

    const counts = new Set(sorted.map(([tag, count]) => count));
    const topMinCount = Math.min(...[...counts].slice(0, 3));

    return sorted.filter(([tag, count]) => count >= topMinCount);
}
