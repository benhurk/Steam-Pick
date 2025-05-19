export default function getYearFromUnix(unix: number) {
    const date = new Date(unix * 1000);

    return date.getFullYear();
}
