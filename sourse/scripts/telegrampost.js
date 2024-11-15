const TOKEN = '7709180332:AAGVehnaqUxvwvMTAICuslwJAitXBNtBOCs';
const CHET_ID = '-4563443941';
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const SUCCESS = document.getElementById("success");
const FALL = document.getElementById('fall')
const ZAKAZ = document.getElementById('obl');
// const cartStorage2 = JSON.parse(localStorage.getItem("cart") || "[]")

let message = `<b>Новый заказ с сайта!</b>\n`;

// Конечная сумма нужна хз почему честное слово она есть в скрипте
function getTotal() {
    const result = document.getElementsByClassName("result")[0];
    let temp = cart.map(function (item) {
        return parseInt(item.price * item.quantity);
    });

    let sum = temp.reduce(function (prev, next) {
        return prev + next;
    }, 0);
    const sumi = sum
    return sumi
}
//Удалить все
function removeAllost() {
    let tempas = []
    localStorage.setItem("cart", JSON.stringify(tempas));
}


document.getElementById('tg').addEventListener('submit', function (e) {
    e.preventDefault();

    message += `<b>ФИО: </b> ${this.name.value}\n`;
    message += `<b>Номер телефона: </b> ${this.number.value}\n`;
    message += `<b>Адрес: </b> ${this.text.value}\n`;
    message += `<b>Время доставки: </b> ${this.time.value}\n`;
    message += `<b>Заказ: </b>\n`;
    if (cartStorage.length) {
        cartStorage.forEach(el => {
            const { name, id } = el

            message += `• ${name} - ${Quantity(id)} шт\n`
        })
    }
    message += `<b>Итоговая сумма: </b> ${getTotal()} ₽`;



    axios.post(URL_API, {
        chat_id: CHET_ID,
        parse_mode: 'html',
        text: message,
        reply_markup: {
            inline_keyboard: [
                [{ text: '✅ Подтвердить', callback_data: 'accept' }],
                [{ text: '❌ Удалить', callback_data: 'delete' }]
            ]
        }

    })
        .then((res) => {
            this.name.value = '';
            this.number.value = '';
            this.text.value = '';
            this.time.value = '';

            removeAllost();

            ZAKAZ.style.display = "block"
            SUCCESS.style.display = "flex"
        })
        .catch((err) => {
            FALL.style.display = "flex"
            console.warn(err);
        })
        .finally(() => {
            console.log("End");
        })
})

