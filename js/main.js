class Product {
    constructor(item = {title: 'title', price: 0}) {
        this.id = item.id_product
        this.title = item.product_name
        this.price = item.price
    }

    render() {
        return `<div class="products-item" data-id="${this.id}" data-title="${this.title}" data-price="${this.price}">
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
        this.id = item.id
        this.title = item.title
        this.price = item.price
        this.quantity = 1 
    }
    
    render() {
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
    }

    init() {
        //вешаю обработчики в момент инициализации
        document.querySelector('.cart-button').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible')
        })//уместно ли так или лучше создавать переменные для дом элементов и уже с ними работать?
        document.querySelector('.cart-block').addEventListener('click', (e) => {
            if (e.target.className === 'remove-button' || e.target.parentNode.className === 'remove-button') { //здесь не придумал ничего лучше, т.к. не срабатывает обработчик на вложенном элеиенте, пришлось маленько костылить, как оптимизировать?
                cart.removeItem(e.target.parentNode.dataset)
            }
        })
        this._fetchData()
        this._render()

    }
    
    addItem(data) {
        let item = new CartProduct(data)
        let findItem = this.items.find(el => el.id === item.id)
        if (findItem) {
            findItem.quantity++
        } else {
        this.items.push(item)
        }
        //метод добавления товара в корзину
        this._render()//сразу отрисовываем новый товар
    }

    removeItem(data) {
        let findItem = this.items.find(el => el.id === data.id)
        if (findItem.quantity > 1) {
            findItem.quantity--
        } else {
            let index = this.items.indexOf(findItem)
            console.log(index)
            this.items.splice(index, 1)
        }
        this._render()
        //и тоже отрисовываем измененную корзину
        //метод удаления товара из корзины
    }

    _fetchData() {
        //если ранее были в корзине сохранены товары и эти данные мы получаем с сервера
    }

    _render() {
        this.container.innerHTML = '' 
        this.items.forEach(item => this.container.insertAdjacentHTML('beforeend', item.render()))
        //отрисовываем корзину
    }

    _calcSum() {
        //сумма товаров добавленных в корзину
    }

}

let catalog = new ProductsList()
let cart = new Cart()
catalog.init()
cart.init()