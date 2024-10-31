document.addEventListener("DOMContentLoaded", () => {
    const orderTotal = localStorage.getItem("cartTotal") || "$0.00";
    document.getElementById("order-total-price").textContent = orderTotal;

    const onlinePaymentForm = document.getElementById("online-payment-form");
    const placeOrderButton = document.getElementById("place-order-btn");
    const cancelOrderButton = document.getElementById("cancel-order-btn");

    // Toggle visibility of payment form based on selection
    document.querySelectorAll('input[name="payment"]').forEach(input => {
        input.addEventListener("change", () => {
            onlinePaymentForm.style.display = (input.value === "online") ? "block" : "none";
        });
    });

    // Card number auto-formatting
    const cardNumberInput = document.getElementById("card-number");
    cardNumberInput.addEventListener("input", () => {
        let value = cardNumberInput.value.replace(/\D/g, '').substring(0, 16); // Only digits, max length 16
        value = value.replace(/(.{4})/g, '$1 ').trim(); // Add space every 4 digits
        cardNumberInput.value = value;
    });

    // Expiry date auto-formatting
    const expiryDateInput = document.getElementById("expiry-date");
    expiryDateInput.addEventListener("input", () => {
        let value = expiryDateInput.value.replace(/\D/g, '').substring(0, 4); // Only digits, max length 4
        if (value.length >= 2) {
            value = `${value.substring(0, 2)}/${value.substring(2)}`;
        }
        expiryDateInput.value = value;
    });

    // Handle order placement
    placeOrderButton.addEventListener("click", () => {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

        if (selectedPayment === "cash") {
            alert("Order placed with Cash on Delivery!");
            window.location.href = "index.html";
        } else if (selectedPayment === "online") {
            const cardNumber = cardNumberInput.value.replace(/\s/g, ''); // Remove spaces for validation
            const expiryDate = expiryDateInput.value;
            const cvv = document.getElementById("cvv").value;
            const cardholderName = document.getElementById("cardholder-name").value;

            // Validate online payment details
            if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
                alert("Please fill out all payment details.");
                return;
            }

            // Validate card number (must be 16 digits)
            const cardNumberPattern = /^\d{16}$/;
            if (!cardNumberPattern.test(cardNumber)) {
                alert("Card number must be 16 digits.");
                return;
            }

            // Validate expiry date (format MM/YY)
            const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
            if (!expiryDatePattern.test(expiryDate)) {
                alert("Expiry date must be in MM/YY format.");
                return;
            }

            // Validate CVV (must be 3 digits)
            const cvvPattern = /^\d{3}$/;
            if (!cvvPattern.test(cvv)) {
                alert("CVV must be 3 digits.");
                return;
            }

            // If all fields are valid
            alert("Order placed with Online Payment!");
            window.location.href = "index.html"; // Redirect to home page
        }
    });

    cancelOrderButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        window.location.href = "index.html"; // Redirect to home page
    });
});
