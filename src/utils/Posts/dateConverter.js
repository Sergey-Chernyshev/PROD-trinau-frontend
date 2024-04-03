export default function dateConverter(isoDate) {
    if (isoDate === null) {
        return ""
    }
    const dateObj = new Date(isoDate);
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear());
    const dayOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][dateObj.getDay()];
    const formattedDate = `${hours}:${minutes} ${day}.${month}.${year} (${dayOfWeek})`;
    return formattedDate;
}

