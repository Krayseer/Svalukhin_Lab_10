/**
 * Проверяет, является ли строка пустой или состоящей из пробелов
 *
 * @param value проверяемое значение
 *
 * @returns {boolean} true, если строка пустая
 */
function isEmpty(value) {
    return !value || value.trim() === "";
}

/**
 * Проверяет валидность email через простое регулярное выражение
 *
 * @param email почтовый адрес пользователя
 *
 * @returns {boolean} true, если email корректный
 */
function isValidEmail(email) {
    const regex = /^[^@]+@[^@]+\.[^@]+$/;
    return regex.test(email);
}

/**
 * Возвращает массив ошибок валидации
 *
 * @param fields объект с полями формы
 *
 * @returns {string[]} список ошибок
 */
function validateOrderForm(fields) {
    const errors = [];
    if (isEmpty(fields.product) || fields.product.length < 2) {
        errors.push("Название продукта слишком короткое");
    }
    if (!isValidEmail(fields.email)) {
        errors.push("Некорректный email");
    }
    if (isEmpty(fields.count) || Number(fields.count) < 1) {
        errors.push("Количество должно быть больше 0");
    }
    if (isEmpty(fields.date)) {
        errors.push("Выберите дату доставки");
    }
    return errors;
}

/**
 * Выводит данные заказа в DOM
 *
 * @param {object} data объект с данными заказа
 */
function displayOrderResult(data) {
    const resultElement = document.getElementById("orderResult");
    resultElement.innerText = `
        Заказ принят!
        Товар: ${data.product}
        Email: ${data.email}
        Количество: ${data.count}
        Дата доставки: ${data.date}
    `;
}

/**
 * Сохраняет данные заказа в localStorage
 *
 * @param {object} data объект с данными заказа
 */
function saveOrderToLocalStorage(data) {
    localStorage.setItem("order", JSON.stringify(data));
}

/**
 * Обработчик нажатия на кнопку "Отправить заказ" в форме "Заказ продукта"
 */
document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();

    /**
     * Считывание значений полей
     */
    const data = {
        product: document.getElementById("productName").value.trim(),
        email: document.getElementById("email").value.trim(),
        count: document.getElementById("count").value.trim(),
        date: document.getElementById("deliveryDate").value
    };
    /**
     * Валидация формы
     */
    const errors = validateOrderForm(data);
    /**
     * Если есть ошибки - выводим
     */
    if (errors.length > 0) {
        alert("Ошибки:\n" + errors.join("\n"));
        return;
    }
    /**
     * Показываем результат создания заказа и сохраняем результат в локальное хранилище
     */
    displayOrderResult(data);
    saveOrderToLocalStorage(data);
});

/**
 * Перемещение иконки ракеты по направлениям вверх, вниз, вправо, влево
 */
document.querySelectorAll(".button-controls button").forEach(btn => {
    const movableButton = document.querySelector(".movable-button");
    btn.addEventListener("click", () => {
        movableButton.classList.remove("pos-top", "pos-bottom", "pos-left", "pos-right");
        movableButton.classList.add("pos-" + btn.dataset.pos);
    });
});
