 function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0 (январь)
    const year = date.getFullYear(); // Получаем полный год

    return `${day}.${month}.${year}`; // Форматируем строку
}



export default getCurrentDate;
