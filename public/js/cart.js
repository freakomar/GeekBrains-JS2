import {CartItem} from './cart-item.js'

export const Cart = {
    inject: ['API', 'getJson', 'postJson', 'putJson'],
    components: {
        CartItem
    },
    data() {
        return {
            cartProducts: [],
            cartImg: 'http://placehold.it/100x75',
            isShown: false,
        }
    },
    computed: {
        calcGoods () {
            let sum = 0
            this.cartProducts.forEach(item => {
                sum += item.quantity
            })
            return sum
        },
        calcSum () {
            let sum = 0
            this.cartProducts.forEach(item => {
                sum += item.quantity * item.price
            })
            return sum
        },
    },
    methods: {
        addProduct(product) {
            if(!this.isShown) {
                this.isShown = !this.isShown
            }
            let find = this.cartProducts.find(el => el.id_product === product.id_product)
            if(find) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    });
                return;
            }
            let prod = Object.assign({ quantity: 1 }, product)
            this.postJson(`/api/cart`, prod)
                .then(data => {
                    if (data.result) {
                        this.cartProducts.push(prod)
                    }
                })
        },
        removeProduct(product) {
            this.$root.getJson(`${this.$root.API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result) {
                    let find = this.cartProducts.find(el => el.id_product === product.id_product)
                    if(find.quantity > 1) {
                        find.quantity--
                    } else {
                        let index = this.cartProducts.indexOf(find)
                        this.cartProducts.splice(index, 1)
                    }
                } else {
                    console.log('error')
                }
            })
        }
    },
    mounted() {
        this.getJson(`/api/cart`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data.contents) {
                    this.cartItems.push(product);
                }
            });
    },
    template: `<div class="cart">
                    <form action="#" class="cart-search">
                        <input type="text" class="search-field" placeholder="Search" v-model.lazy="userSearch">
                        <button class="search-button" type="submit">
                            <i class="fa fa-search"></i>
                        </button>
                    </form>
                    <button class="cart-button" @click="isShown = !isShown">Корзина</button>
                    <div class="cart-block" v-show="isShown">
                        <CartItem v-for="el of cartProducts" :key="el.id_product" :img="cartImg" :item="el"></CartItem>
                        <p class="cart-p" v-show="cartProducts.length">Итого {{ calcGoods }} шт. на сумму {{ calcSum }} руб.</p>
                    </div>
                </div>`
}