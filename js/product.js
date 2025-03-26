// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Find product details
const product = products.find(p => p.id == productId);
if (product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-stock").textContent = product.stock;
}

// Cart System
let cart = [];
function addToCartFromDetails() {
    let selectedQuantity = document.querySelector('input[name="quantity"]:checked');
    if (!selectedQuantity) {
        alert("Please select a quantity.");
        return;
    }

    let quantity = parseInt(selectedQuantity.value);

    let cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
        alert("You have already added this item with a selected quantity.");
        return;
    }

    let freezeTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 hours freeze
    cart.push({ ...product, quantity: quantity, freezeUntil: freezeTime });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
}

// Go back to Homepage
function goBack() {
    window.location.href = "index.html";
}
