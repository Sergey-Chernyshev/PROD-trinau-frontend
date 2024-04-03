export default function fixCalendarDate(dateStr) {

    const parts = dateStr.split('-');
    const year = parts[0];
    const day = parseInt(parts[2]);

    return `${day}.${parts[1]}.${year}`;
}