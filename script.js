const API_KEY = 'YFTHoIZ89drnRaPldZlCE5zQUz0NAOpSDxMWWhbMwV9BWHTXFFXK7gZg';
const products = [];
let currentPage = 1;
const itemsPerPage = 12;

async function fetchImages(page) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=electronics&per_page=${itemsPerPage}&page=${page}`, {
            headers: {
                Authorization: API_KEY,
            },
        });
        const data = await response.json();
        return data.photos.map(photo => photo.src.medium);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function generateProducts(images) {
    const productNames = ["Laptop",  "Camera","Smartphone", "Tablet", "Headphones", "Smartwatch", "Speaker", "Monitor"];
    for (let i = 0; i < images.length; i++) {
        products.push({
            id: products.length + 1,
            name: `${productNames[i % productNames.length]} ${products.length + 1}`,
            price: (Math.random() * (500 - 80) + 50).toFixed(2),
            image: images[i]
        });
    }
}

function displayProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("item");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="giftWrap(${product.id})" class="gift-btn">Gift Wrap</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;
}
// Define additional charge for gift wrapping
// Define additional charge for gift wrapping
const GIFT_WRAP_CHARGE = 5.00;

function giftWrap(productId) {
    // Display modal with GIF animation
    const modal = document.getElementById("gift-modal");
    modal.style.display = "flex"; // Show modal

    // Hide modal after 4 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 4000); // 4000 milliseconds = 4 seconds

    // Add gift wrap animation to the product item
    const productList = document.getElementById("product-list");
    const productDiv = productList.querySelector(`[onclick="addToCart(${productId})"]`).parentNode;
    productDiv.classList.add('wrap-effect');

    setTimeout(() => productDiv.classList.remove('wrap-effect'), 500); // Remove effect after animation

    // Add to cart with gift option
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(p => p.id === product.id && p.isGift);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        product.quantity = 1;
        product.isGift = true;  // Mark product as a gift
        product.giftCharge = GIFT_WRAP_CHARGE;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}



async function loadMoreProducts() {
    const images = await fetchImages(currentPage);
    generateProducts(images);
    displayProducts();
    currentPage++;
}



window.onload = function() {
    loadMoreProducts();
    updateCartCount();
};
