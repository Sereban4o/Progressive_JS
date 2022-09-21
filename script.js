const goods = [
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

const renderGoodsItem = (title = "Товар", price = "Цена не указана",
    image) => {
    return `<div class="goods-item"><h3 class="goods__heading">${title}</h3>\
    <img class="goods__img" src=${image} alt="Товар">\
    <p class="goods__price">${price} руб.</p><hr class="goods__hr">\
    <button class="goods__add" type="button">Добавить</button></div>`;
};

const renderGoodsList = (list) => {
    document.querySelector('.goods-list').innerHTML =
        list.map(item => renderGoodsItem(item.title, item.price, item.image)).join('');
}

renderGoodsList(goods);
