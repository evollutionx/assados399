document.addEventListener('DOMContentLoaded', (event) => {
    const cart = getCart();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.dataset.item;
            const price = this.dataset.price;
            const quantityInput = this.parentElement.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value) || 1;

            if (cart[item]) {
                cart[item].quantity += quantity;
            } else {
                cart[item] = { price: parseFloat(price), quantity: quantity };
            }

            setCart(cart);
            alert(`${quantity} x ${item} foi adicionado ao carrinho!`);
        });
    });

    document.querySelectorAll('.quantity-minus').forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = this.parentElement.querySelector('.quantity-input');
            const currentQuantity = parseInt(quantityInput.value) || 1;
            if (currentQuantity > 1) {
                quantityInput.value = currentQuantity - 1;
            }
        });
    });

    document.querySelectorAll('.quantity-plus').forEach(button => {
        button.addEventListener('click', function() {
            const quantityInput = this.parentElement.querySelector('.quantity-input');
            const currentQuantity = parseInt(quantityInput.value) || 1;
            quantityInput.value = currentQuantity + 1;
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
