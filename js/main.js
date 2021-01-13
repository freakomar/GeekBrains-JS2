const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Keyboard', price: 200 },
    { id: 3, title: 'Mouse', price: 100 },
    { id: 4, title: 'Gamepad', price: 87 },
];


const renderProduct = (item = {title: 'title', price: 'price'}) => {
    return `<div class="products-item">
    <img src="http://placehold.it/200x150" alt="image">
    <p class="item-title">${item.title}</p>
    <p class="item-price">${item.price}</p>
    <button class='products-btn'>Купить</button>
</div>`
};

const render = productsList => {
    const productsElements = productsList.map(item => renderProduct(item))
    document.querySelector('.products').innerHTML = productsElements.join('')
};

render(products);