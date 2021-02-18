import {ProductsItem} from './products-item.js'

export const Products = {
    inject: ['API', 'getJson'],
    components: {
        ProductsItem
    },
    data() {
        return {
            products: [],
            imgCatalog: 'https://placehold.it/200x150' 
        }
    },
    computed: {
        filtered() {
            return this.products.filter(item => new RegExp(this.$root.$refs.search.userSearch, 'i').test(item.product_name));
        }
    },
    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data) {
                    this.products.push(product);
                }
            });
    },
    template: `<div class='products'>
                    <ProductsItem v-for='el of products' :key='el.id_product' :img='imgCatalog' :item='el'>
                    </ProductsItem>
                </div>`
}