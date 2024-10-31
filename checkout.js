// Function to populate order summary with cart items
function loadOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const totalPriceContainer = document.getElementById('total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    orderItemsContainer.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderItemsContainer.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    totalPriceContainer.textContent = `$${totalPrice.toFixed(2)}`;
    localStorage.setItem("cartTotal", totalPrice.toFixed(2)); // Store total price
}

// Function to place order (clear cart and redirect to thank you page or display confirmation)
function placeOrder() {
    alert("Order placed successfully!");
    localStorage.removeItem('cart'); // Clear the cart after placing order
    window.location.href = "placeOrder.html"; // Redirect or show confirmation
}

// Load order summary when the page loads
window.onload = function() {
    loadOrderSummary();
};

document.getElementById('place-order-btn').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;

    // Check if all fields are filled
    if (!name || !address || !city || !zip || !country) {
        alert('Please fill in all fields before proceeding to checkout.');
        return; // Prevent navigation
    }

    // If all fields are filled, proceed with placing the order
    placeOrder();
});
