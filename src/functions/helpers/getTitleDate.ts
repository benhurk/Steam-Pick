export default function getTitleDate(gameName: string) {
    const regex = /\(\d+\)/;
    const match = gameName.match(regex);

    return match ? match[0] : undefined;
}
