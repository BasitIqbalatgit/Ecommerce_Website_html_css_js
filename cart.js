function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        // Display gift tag if item is marked as gift
        const giftTag = item.isGift ? `<span class="gift-tag">🎁 Gift</span>` : '';
        const giftCharge = item.isGift ? `+ $${item.giftCharge.toFixed(2)}` : '';

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name} ${giftTag}</h3>
                <p>Price: $${item.price} ${giftCharge}</p>
                <div class="item-quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <input type="number" value="${item.quantity}" min="1" readonly>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateTotalPrice();
    toggleCheckoutButton(); // Check if the button should be enabled or disabled
}

function toggleCheckoutButton() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Enable the button if there's at least one item in the cart
    if (cart.length > 0) {
        checkoutBtn.disabled = false;
    } else {
        checkoutBtn.disabled = true;
    }
}

function updateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((acc, item) => acc + (item.price + (item.isGift ? item.giftCharge : 0)) * item.quantity, 0);
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    toggleCheckoutButton(); // Check if the button should be enabled or disabled
}

function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function increaseQuantity(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

function decreaseQuantity(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(itemId);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

document.getElementById('checkout-btn').addEventListener('click', function() {
    window.location.href = "checkout.html";
});

window.onload = function() {
    displayCartItems();
};
