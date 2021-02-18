export const ProductsItem = {
    props: ['img', 'item'],
    template: `<div class="products-item">
        <img :src="img" :alt="item.product_name">
        <p class="item-title">{{ item.product_name }}</p>
        <p class="item-price">{{ item.price }}</p>
        <button class='products-btn' @click="$root.$refs.cart.addProduct(item)">Купить</button>
    </div>`
}