const products = [
    { id: 1, name: "Walnut", category: "nuts", price: 100, stock: 50, image: "images/wall nut.webp", description: "Rich in Omega-3, helps in brain function and heart health." },
    { id: 2, name: "Almond", category: "nuts", price: 200, stock: 60, image: "images/almond.webp", description: "Loaded with Vitamin E, great for skin, hair, and energy." },
    { id: 3, name: "Cashew (Kaju)", category: "nuts", price: 220, stock: 40, image: "images/cashew.webp", description: "Creamy and delicious, a great source of protein and iron." },
    { id: 4, name: "Pista (Plain)", category: "nuts", price: 210, stock: 50, image: "images/pista plain.webp", description: "Low in calories, high in antioxidants, good for heart health." },
    { id: 5, name: "Pista (Roasted/Salted)", category: "nuts", price: 230, stock: 30, image: "images/pista plain.webp", description: "Crunchy and salty, a great snack full of nutrition." },
    { id: 6, name: "Anjeera (Figs)", category: "raisins", price: 180, stock: 25, image: "images/anjeer.webp", description: "High in fiber, helps in digestion and weight loss." },
    { id: 7, name: "Kishmish (Green)", category: "raisins", price: 140, stock: 45, image: "images/green kishmish.webp", description: "Sweet and nutritious, rich in iron and good for digestion." },
    { id: 8, name: "Kishmish (Yellow)", category: "raisins", price: 135, stock: 40, image: "images/yellow kishmish.png", description: "Boosts energy, supports healthy skin and hair." },
    { id: 9, name: "Black Grapes (Raisina)", category: "raisins", price: 150, stock: 35, image: "images/black grapes.webp", description: "Rich in antioxidants, good for blood circulation and heart." },
    { id: 10, name: "Dates", category: "dates", price: 100, stock: 60, image: "images/dates.webp", description: "Rich in natural sugar and fiber, boosts instant energy." },
    { id: 11, name: "Dry Dates", category: "dates", price: 120, stock: 50, image: "images/dry-dates.webp", description: "Strengthens bones and improves digestion." },
    { id: 12, name: "Dry Dates (Black)", category: "dates", price: 130, stock: 40, image: "images/black dry dates.webp", description: "Rich in iron, great for boosting immunity and energy." },
    { id: 13, name: "Albukara", category: "raisins", price: 120, stock: 30, image: "images/albhukara.webp", description: "Dried apricots packed with Vitamin A, good for eyesight." },
    { id: 14, name: "Apricots (Kurbani/Jardalu)", category: "raisins", price: 140, stock: 35, image: "images/apricots.jpg", description: "Rich in antioxidants, improves skin and digestion." },
    { id: 15, name: "Amla (Sweet & Salt)", category: "seeds", price: 90, stock: 40, image: "images/amla.png", description: "Superfood for immunity, digestion, and glowing skin." },
    { id: 16, name: "Prunes (California)", category: "raisins", price: 180, stock: 25, image: "images/prunes.webp", description: "Great for digestion and bone strength." },
    { id: 17, name: "Sweet Tamarind", category: "seeds", price: 100, stock: 50, image: "images/sweet tamarind.avif", description: "Rich in Vitamin C, helps in digestion and weight loss." },
    { id: 18, name: "Chilgoja", category: "seeds", price: 190, stock: 20, image: "images/chilgoja.webp", description: "Pine nuts, good for brain and heart health." },
    { id: 19, name: "Chiranji (Saarapappu)", category: "seeds", price: 160, stock: 30, image: "images/chiranji.jpg", description: "Used in sweets, rich in vitamins and proteins." },
    { id: 20, name: "Black Dates", category: "dates", price: 110, stock: 30, image: "images/black dates.webp", description: "Natural sweetener, helps in digestion and energy boost." }
];

function loadProducts() {
    let container = document.getElementById("container");
    container.innerHTML = "";

    products.forEach(product => {
        let productHTML = `
            <div class="items">
                <div class="item-image" onclick="redirectToProduct(${product.id})">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h2>${product.name}</h2>
                <p>₹${product.price} per KG</p>
            </div>
        `;
        container.innerHTML += productHTML;
    });
}

// Redirect to Product Page
function redirectToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}


// 🔹 Show Product Details in Sliding Modal
function showProductDetails(productId) {
    let product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById("detail-name").textContent = product.name;
    document.getElementById("detail-image").src = product.image;
    document.getElementById("detail-description").textContent = product.description;
    document.getElementById("detail-stock").textContent = product.stock;
    document.getElementById("detail-price").textContent = product.price;

    // Add quantity options
    let quantityOptions = `
        <div class="quantity-options">
            <input type="radio" name="quantity" id="q200" value="200">
            <label for="q200">200g</label>
            <input type="radio" name="quantity" id="q250" value="250">
            <label for="q250">250g</label>
            <input type="radio" name="quantity" id="q500" value="500">
            <label for="q500">500g</label>
            <input type="radio" name="quantity" id="q1kg" value="1000">
            <label for="q1kg">1kg</label>
            <input type="radio" name="quantity" id="q2kg" value="2000">
            <label for="q2kg">2kg</label>
            <input type="radio" name="quantity" id="q5kg" value="5000">
            <label for="q5kg">5kg</label>
        </div>
    `;
    document.getElementById("product-modal-content").innerHTML = quantityOptions;

    selectedProduct = product;
    document.getElementById("product-modal").classList.add("active");
}

// 🔹 Close Product Details Modal
function closeDetails() {
    document.getElementById("product-modal").classList.remove("active");
}

// 🔹 Cart System with 3-Hour Freezing
let cart = [];
function addToCartFromDetails() {
    let selectedQuantity = document.querySelector('input[name="quantity"]:checked');
    if (!selectedQuantity) {
        alert("Please select a quantity.");
        return;
    }

    let quantity = parseInt(selectedQuantity.value);
    let product = selectedProduct;

    if (!product) return;

    let cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
        alert("You have already added this item with a selected quantity.");
        return;
    }

    // Add to cart with freeze timer (3 hours)
    let freezeTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 hours from now
    cart.push({ ...product, quantity: quantity, freezeUntil: freezeTime });

    updateCartUI();
    closeDetails();
}

// 🔹 Update Cart UI
function updateCartUI() {
    let cartList = document.getElementById("cart-items");
    let totalPrice = 0;
    cartList.innerHTML = "";

    cart.forEach(item => {
        totalPrice += (item.price / 1000) * item.quantity;
        let remainingTime = Math.max(0, Math.floor((item.freezeUntil - new Date().getTime()) / 60000)); // Minutes left
        cartList.innerHTML += `
            <li>
                ${item.name} - ₹${(item.price / 1000) * item.quantity} (${item.quantity}g)
                <br><small>Frozen for: ${remainingTime} min</small>
                <button onclick="removeFromCart(${item.id})">❌</button>
            </li>
        `;
    });

    document.getElementById("cart-total").textContent = `Total: ₹${totalPrice.toFixed(2)}`;
    document.getElementById("cart-count").textContent = cart.length;
}

// 🔹 Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// 🔹 Show & Hide Cart Modal
function showCart() {
    document.getElementById("cart-modal").classList.remove("hidden");
}

function closeCart() {
    document.getElementById("cart-modal").classList.add("hidden");
}

// 🔹 Checkout Process
function checkout() {
    let note = document.getElementById("note").value;
    alert("Your order has been placed!\n\nNote: " + note);
    cart = [];
    updateCartUI();
    closeCart();
}

// 🔹 Load products on page load
window.onload = loadProducts;