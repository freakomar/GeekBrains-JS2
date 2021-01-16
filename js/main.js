const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Keyboard', price: 200 },
    { id: 3, title: 'Mouse', price: 100 },
    { id: 4, title: 'Gamepad', price: 87 },
]

class Product {
    constructor(item = {title: 'title', price: 0}) {
        this.id = item.id
        this.title = item.title
        this.price = item.price
    }

    render() {
        return `<div class="products-item">
            <img src="http://placehold.it/200x150" alt="image">
            <p class="item-title">${this.title}</p>
            <p class="item-price">${this.price}</p>
            <button class='products-btn'>Купить</button>
        </div>`
    }
}


class ProductsList {
    constructor() {
        this.container = document.querySelector('.products')
        this.products = []
        this.data = []
    }

    init() {
        this._fetchData()
        this._render()
    }

    addItem() {
        //метод добавления товара в корзину
    }

    calcSum() {
        let sum = 0
        this.products.forEach(item => {
            sum += item.price
        })
        console.log(sum)
    }

    _fetchData() {
        this.data = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Keyboard', price: 200 },
            { id: 3, title: 'Mouse', price: 100 },
            { id: 4, title: 'Gamepad', price: 87 },
        ]
        this.data.forEach(item => {
            this.products.push(new Product(item))
        })
    }

    _render() {
        this.products.forEach(item => this.container.insertAdjacentHTML('beforeend', item.render()))
    }
}

class CartProduct {
    constructor(item) {
        this.id = item.id
        this.title = item.title
        this.price = item.price
        this.quantity = 1 //добавил количество, для последующего добавления нескольких товаров
    }
    //разметка уже была, поэтому класс прописал полностью
    render() {
       return `<div class="cart-item">
                    <img src="http://placehold.it/100x75" alt="">
                    <p class="cart-title">${this.title}</p>
                    <p class="cart-price">${this.price}</p>
                    <p class="cart-quantity">${this.quantity}</p>
                    <button class="remove-button">
                        <i class="fa fa-times"></i>
                    </button>
                </div>`
    }
}

class Cart {
    constructor () {
        this.container = document.querySelector('.cart-block')
        this.items = [] //хранение добавленых товаров
        this.data = [] //возможность хранения полученных от сервера данных о ранее добавленых товарах
    }

    init() {
        //метод по аналогии с списком товаров
    }

    removeItem() {
        //метод удаления товара из корзины
    }

    _fetchData() {
        //если ранее были в корзине сохранены товары и эти данные мы получаем с сервера
    }

    _render() {
        //отрисовываем корзину
    }

    _calcSum() {
        //сумма товаров добавленных в корзину
    }

}

let catalog = new ProductsList()
catalog.init()