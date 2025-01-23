document.addEventListener('DOMContentLoaded', (event) => {
    const cart = getCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.dataset.item;
            const price = this.dataset.price;

            if (cart[item]) {
                cart[item].quantity += 1;
            } else {
                cart[item] = { price: parseFloat(price), quantity: 1 };
            }

            setCart(cart);
            alert(`${item} foi adicionado ao carrinho!`);
        });
    });
});

function getCart() {
    const cart = document.cookie.split(';').find(c => c.trim().startsWith('cart='));
    return cart ? JSON.parse(decodeURIComponent(cart.split('=')[1])) : {};
}

function setCart(cart) {
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))};path=/;`;
}
