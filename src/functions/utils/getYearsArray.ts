export default function getYearsArray() {
    const currentYear = new Date().getFullYear();

    const years = [];
    for (let year = 1990; year <= currentYear; year += 5) {
        years.push(year);
    }

    return years;
}
