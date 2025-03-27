async function loadProducts() {
    const res = await fetch("http://localhost:3000/products");
    const products = await res.json();

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${product.name}</h3><p>$${product.price}</p><img src="${product.image}" width="100">`;
        productList.appendChild(div);
    });
}

loadProducts();
