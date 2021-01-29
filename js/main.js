class Product {
    constructor(item = {title: 'title', price: 0}) {
        this.id = item.id_product
        this.title = item.product_name
        this.price = item.price
    }

    render() {
        return `<div class="products-item" data-id_product=${this.id} data-product_name="${this.title}" data-price=${this.price}>
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
        this.url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
    }

    init() {
        //вешаю обработчики в момент инициализации
        this.container.addEventListener('click', (e) => {
            if (e.target.className === 'products-btn') {
                cart.addItem(e.target.parentNode.dataset) //не придумал другого способа передать информацию о товаре
            }
        })
        this._fetchData()
    }

        calcSum() {
        let sum = 0
        this.products.forEach(item => {
            sum += item.price
        })
        return sum
    }

    _fetchData() {
        fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
            .then(result => result.json())
            .then(data => {
                this.data = data
                this.data.forEach(item => {
                    this.products.push(new Product(item))
                })
                this._render()       
        })
    }

    _render() {
        this.products.forEach(item => this.container.insertAdjacentHTML('beforeend', item.render()))
    }
}

class CartProduct {
    constructor(item) {
        this.id = +item.id_product
        this.title = item.product_name
        this.price = +item.price
        this.quantity = 1
        this.rendered = false 
    }
    
    render() {
        this.rendered = true
        return `<div class="cart-item" data-id="${this.id}">
                    <img src="http://placehold.it/100x75" alt="">
                    <p class="cart-p">${this.title}</p>
                    <p class="cart-p">${this.price} руб.</p>
                    <p class="cart-p">${this.quantity}шт.</p>
                    <button class="remove-button" data-id="${this.id}">
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
        this.amount = 0
        this.countGoods = 0
        this.shown = false
    }

    init() {
        //вешаю обработчики в момент инициализации
        document.querySelector('.cart-button').addEventListener('click', () => {
            this.container.classList.toggle('invisible')
            this.shown = !this.shown
        })
        this.container.addEventListener('click', (e) => {
            if (e.target.className === 'remove-button' || e.target.parentNode.className === 'remove-button') { //здесь не придумал ничего лучше, т.к. не срабатывает обработчик на вложенном элеиенте, пришлось маленько костылить, как оптимизировать?
                this.removeItem(e.target.parentNode.dataset)
            }
        })
        this._fetchData()
    }
    
    addItem(data) {
        if (!this.shown) {
            this.container.classList.toggle('invisible')
            this.shown = !this.shown
        }
        let item = new CartProduct(data)
        let findItem = this.items.find(el => el.id === +item.id)
        if (findItem) {
            findItem.quantity++
        } else {
        this.items.push(item)
        }
        //метод добавления товара в корзину
        this._render()//сразу отрисовываем новый товар
    }

    removeItem(data) {
        let findItem = this.items.find(el => el.id === +data.id)  //борьба с типизацией только так у меня получается.. правильно ли?
        if (findItem.quantity > 1) {
            findItem.quantity--
        } else {
            let index = this.items.indexOf(findItem)
            this.items.splice(index, 1)
        }
        this._render()
        //и тоже отрисовываем измененную корзину
        //метод удаления товара из корзины
    }

    _fetchData() {
        fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json')
            .then(result => result.json())
            .then(data => {
                this.data = data.contents
                this.data.forEach(item => {
                    this.items.push(new CartProduct(item))
                })
                this._render()       
        })
        //если ранее были в корзине сохранены товары и эти данные мы получаем с сервера
    }

    _render() {
        this._calcSum()
        this._calcGoods()
        this.container.innerHTML = '' 
        this.items.forEach(item => this.container.insertAdjacentHTML('beforeend', item.render()))
        if (this.items.length) {
        this.container.insertAdjacentHTML('beforeend', `<p class="cart-p">Итого ${this.countGoods} шт. на сумму ${this.amount} руб.</p>`)
        }
        //отрисовываем корзину
    }

    _calcSum() {
        let sum = 0
        this.items.forEach(item => {
            sum += item.price * item.quantity
        })
        this.amount = sum
        //сумма товаров добавленных в корзину
    }
    _calcGoods() {
        let sum = 0
        this.items.forEach(item => {
            sum += item.quantity
        })
        this.countGoods = sum
        //сумма товаров добавленных в корзину
    }
}

let catalog = new ProductsList()
let cart = new Cart()
catalog.init()
cart.init()