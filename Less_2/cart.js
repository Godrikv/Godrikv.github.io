'use script';

let openBtn = document.querySelector(".btn-group");
let dropdown_menu = document.querySelector('.dropdown-menu');

openBtn.addEventListener('click', function () {
let display = dropdown_menu.style.display;
if (display === 'none'){
    dropdown_menu.style.display = 'block'
} else {
    dropdown_menu.style.display = 'none';
}
});



/**
 * Получаем все кнопки товаров и добавляем слушатель клика на все кнопки, перебира коллекцию
 * И в этот слушатель записывабтся id, price и name того элемента на который кликнули
 */
let btnAddToCart = document.querySelectorAll('.toBasketBtn');

btnAddToCart.forEach(function (btn) {
btn.addEventListener('click', function (event) {
    let id = event.target.dataset.id;
    let price = event.target.dataset.price;
    let name = event.target.dataset.name;
    basket.addProduct({ id: id, price: price, name: name })
})
});


/**
 * Создаём переменную, где будем хранить объект из того что мы получили при клике на элемент "добавить в корзину"
 * @type {{addProduct({id: string, price: string, name: string}): void, products: {}}}
 */

let basket = {
    products: {},

    /**
     * Метод добавляет продукт в корзину.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProduct(product) {
        this.addProductToObject(product);
        this.renderProductInBasket(product);
        this.renderTotalSum();
        this.addRemoveBtnsListeners();
    },

//*****************************************************************************************

    /**
     * Метод добавляет продукт в объект с продуктами.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProductToObject(product) {
        if (this.products[product.id] == undefined) {
            this.products[product.id] = {
                price: product.price,
                name: product.name,
                count: 1
            }
        } else {
            this.products[product.id].count++;
        }
    },

//*****************************************************************************************

    /**
     * Метод добавляет продукт в корзину, сначала мы его создаем, потом с помощью insertAdjacentHTML вставляем в tbody
     * + проверка, если там такой уже есть просто
     * увеличивает счетчик на 1.
     * @param {{ id: string, price: string, name: string }} product
     * @returns
     */
    renderProductInBasket(product) {

        let productRow = `
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td class="productCount" data-id="${product.id}">1</td>
                <td><i class="fas fa-trash-alt productRemoveBtn" data-id="${product.id}"></i></td>
            </tr>
        `;

        let productExist = document.querySelector(`.productCount[data-id="${product.id}"]`);
        if (productExist) {
            productExist.textContent++;
            return;
        }

        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentHTML("beforeend", productRow);
    },

//*****************************************************************************************

    /**
     * Метод отображает общую сумму заказа в корзине.
     */
    renderTotalSum() {
        document.querySelector('.total').textContent = this.getTotalSum();
    },

    /**
     * Метод считает стоимость всех продуктов в корзине.
     * @returns {number}
     */
    getTotalSum() {
        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },

//*****************************************************************************************

    /**
     * Добавляем слушателей события клика по кнопкам удалить.
     */
    addRemoveBtnsListeners() {
        let btns = document.querySelectorAll('.productRemoveBtn');
        for (let i = 0; i < btns.length; i++) {
            //важно указать именно this.removeProductListener, чтобы это была одна и та же
            //функция, а не несколько одинаковых.
            btns[i].addEventListener('click', this.removeProductListener);
        }
    },

    /**
     * Обработчик события клика по кнопке удаления товара.
     * @param {MouseEvent} event
     */
    removeProductListener(event) {
        //console.log(this); this будет указывать на кнопку, а не на объект basket
        //здесь мы используем basket вместо this, потому что контекст вызова не имеет
        //этих методов и нам надо явно обратиться к нашему объекту корзины
        basket.removeProduct(event);
        basket.renderTotalSum();
    },

//*****************************************************************************************

    /**
     * Метод удаляет товар из корзины. Если количество больше 1, то просто уменьшает его.
     * @param {string} id
     */
    removeProductFromBasket(id) {
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        if (countTd.textContent == 1) {
            countTd.parentNode.remove();
        } else {
            countTd.textContent--;
        }
    },

    /**
     * Метод удаляет продукт из объекта с продуктами.
     * @param {string} id
     */
    removeProductFromObject(id) {
        if (this.products[id].count == 1) {
            delete this.products[id];
        } else {
            this.products[id].count--;
        }
    },


    /**
     * Метод удаляет продукт из объекта продуктов, а также из корзины на странице.
     * @param {MouseEvent} event
     */
    removeProduct(event) {
        let id = event.target.dataset.id;
        this.removeProductFromObject(id);
        this.removeProductFromBasket(id);
    },


};

