import {ProductsItem} from './products-item.js'

export const Products = {
    components: {
        ProductsItem
    },
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150' 
        }
    },
    mounted() {
        this.$root.getJson(`${this.$root.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });
        this.$root.getJson(`getProducts.json`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            })
    },
    template: `<div class='products'>
                    <ProductsItem v-for='el of products' :key='el.id_product' :img='imgCatalog' :item='el'>
                    </ProductsItem>
                </div>`
}