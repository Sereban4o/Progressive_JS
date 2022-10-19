const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const cartEl = document.querySelector('.cart');
document.querySelector('.cart-button')
    .addEventListener('click', () => {
        cartEl.classList.toggle('hidden');
    });


function makeGETRequest(url) {
    return new Promise(function (resolve, reject) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    });
}


class GoodsItem {
    constructor(product_name, price, id_product) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product;
    }
    render() {
        return `<div
class="goods-item" data-id=${this.id_product} data-price=${this.price}>\
<h3 class="goods__heading">${this.product_name}</h3>\
<p class="goods__price">${this.price} руб.</p><hr class="goods__hr">\
    <button class="goods__add" type="button">Добавить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }
    async fetchGoods(url) {

        await makeGETRequest(url)
            .then(responseText => {
                this.goods = JSON.parse(responseText);
                this.filteredGoods = JSON.parse(responseText);
                return this.goods;
            })

    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good =>
            regexp.test(good.product_name));
        this.render();

    }

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    goods_sum() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        })
        return sum;
    }

}
///Корзина товаров

class CartList extends GoodsList {
    constructor() {
        super();
        this.colio = 0;
        this.sum = 0;
    }
    async fetchGoods(url) {

        await makeGETRequest(url)
            .then(responseText => {
                this.goods = JSON.parse(responseText);
                this.colio = this.goods.countGoods;
                this.sum = this.goods.amount;
                return this.goods;
            })

    }
    removeGood() {
        el = this.goods.contents.find(item => item.id_product === id_product);
        delete this.goods[el];
        this.render();


    }
    addGood(id_product, price, quantity) {
        if (!(this.goods.contents.find(item => item.id_product === id_product))) {
            this.goods[id_product] = { id_product, price, quantity: 0 };
        } else {
            this.addColio(id_product)
        }
        this.render();
    }
    addColio(id_product) {
        const good = this.goods.contents.find(item => item.id_product === id_product);
        good.quantity += 1;
        this.colio += 1;
        this.sum += good.price;
    }
    render() {
        let listHtml = '';

        this.goods.contents.forEach(good => {
            const goodItem = new CartItem(good.product_name, good.price, good.id_product, good.quantity);
            listHtml += goodItem.render();
        });
        listHtml += this.renderFooter();
        document.querySelector('.cart').innerHTML = listHtml;

    }
    renderFooter() {
        return `<div
class="cart-footer">
<p class="footer">Итого: ${this.colio} на сумму ${this.sum}</p>
</div>`;
    }
}
class CartItem extends GoodsItem {
    constructor(product_name, price, id_product, count) {
        super(product_name, price, id_product);
        this.count = count;
    }

    render() {
        return `<div
class="cart-item" data-id=${this.id_product} data-price=${this.price} \
data-count=${this.count}><h3 class="cart__heading">${this.product_name}</h3>\
<p class="cart__price">${this.price} руб.</p>
<p class="cart__count">${this.count} шт.</p>
</div>`;
    }
}


const list = new GoodsList();
list.fetchGoods(`${API_URL}/catalogData.json`).then(() => {
    list.render();
    document.querySelector('.search-button').addEventListener('click', (e) => {
        const value = document.querySelector('.goods-search').value;
        list.filterGoods(value);
    });
})
    ;

const cart = new CartList();
cart.fetchGoods(`${API_URL}/getBasket.json`).then(() => {
    cart.render();

})
    .then(() => {
        document.querySelector('.goods-list')
            .addEventListener('click', event => {
                if (!event.target.closest('.goods__add')) {
                    return;
                }
                const productEl = event.target.parentNode.dataset;
                const id_product = +productEl.id;
                const price = +productEl.price;
                cart.addGood(id_product, price, 1);

            });
    }
    );

