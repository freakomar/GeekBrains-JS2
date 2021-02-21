export const CartItem = {
    props: ['img', 'item'],
    template: `<div class="cart-item">
                    <img :src="img" alt="">
                    <p class="cart-p">{{ item.product_name }}</p>
                    <p class="cart-p">{{ item.price }} руб.</p>
                    <p class="cart-p">{{ item.quantity }} шт.</p>
                    <button class="remove-button" @click="$root.$refs.cart.removeProduct(item)">
                        <i class="fa fa-times"></i>
                    </button>
                </div>`
}