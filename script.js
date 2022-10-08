class GoodsItem {
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.image = image;
    }
    render() {
        return `<div
class="goods-item"><h3 class="goods__heading">${this.title}</h3>\
<img class="goods__img" src=${this.image} alt="Товар">\
<p class="goods__price">${this.price} руб.</p><hr class="goods__hr">\
    <button class="goods__add" type="button">Добавить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            {
                title: 'Shirt', price: 150,
                image: 'https://images.freeimages.com/images/premium/previews/7344/734471-t-shirt.jpg'
            },
            {
                title: 'Socks', price: 50,
                image: 'https://images.freeimages.com/images/premium/previews/7344/734471-t-shirt.jpg'
            },
            {
                title: 'Jacket', price: 350,
                image: 'https://images.freeimages.com/images/premium/previews/7344/734471-t-shirt.jpg'
            },
            {
                title: 'Shoes', price: 250,
                image: 'https://images.freeimages.com/images/premium/previews/7344/734471-t-shirt.jpg'
            },
            {
                title: 'Shirt', price: 150,
                image: 'https://images.freeimages.com/images/premium/previews/7344/734471-t-shirt.jpg'
            },
            {
                title: 'Socks', price: 50,
                image: 'https://images.freeimages.com/images/premium/previews/7344/734471-t-shirt.jpg'
            },
            {
                title: 'Jacket', price: 350,
                image: 'https://images.freeimages.com/images/premium/previews/7344/734471-t-shirt.jpg'
            },
            {
                title: 'Shoes', price: 250,
                image: 'https://images.freeimages.com/images/premium/previews/7344/734471-t-shirt.jpg'
            },
            {
                title: 'Shoes', price: 250,
                image: 'https://images.freeimages.com/images/premium/previews/7344/734471-t-shirt.jpg'
            },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.image);
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

const list = new GoodsList();
list.fetchGoods();
list.render();

///Корзина товаров

class CartList extends GoodsList {
    removeGood() { }
    addGood() { }
    addColio() { }
}
class CartItem extends GoodsItem {
    render() { }//верстка корзины отличная от списка товаров на странице
}