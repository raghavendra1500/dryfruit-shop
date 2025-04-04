document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const addProductForm = document.getElementById('addProductForm');

    // Fetch and display products
    function fetchProducts() {
        fetch('get_products.php')
            .then(response => response.json())
            .then(data => {
                productList.innerHTML = '';
                data.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>₹${product.price}</td>
                        <td>
                            <input type="number" value="${product.stock}" onchange="updateStock(${product.id}, this.value)">
                        </td>
                        <td>${product.frozen_stock || 0}g</td>
                        <td>
                            <button onclick="editProduct(${product.id})">Edit</button>
                            <button onclick="deleteProduct(${product.id})">Delete</button>
                        </td>
                    `;
                    productList.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Add new product
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const image = document.getElementById('image').files[0];
        const stock = parseInt(document.getElementById('stock').value);

        // Validate inputs
        if (!name || name.length < 3) {
            alert('Product name must be at least 3 characters long.');
            return;
        }
        if (isNaN(price) || price <= 0) {
            alert('Please enter a valid price greater than 0.');
            return;
        }
        if (!image) {
            alert('Please select a valid image file.');
            return;
        }
        if (isNaN(stock) || stock <= 0) {
            alert('Please enter a valid stock quantity greater than 0.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('stock', stock);

        fetch('add_product.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product added successfully!');
                fetchProducts(); // Refresh product list
                addProductForm.reset();
            } else {
                alert('Error adding product: ' + data.message);
            }
        })
        .catch(error => console.error('Error adding product:', error));
    });

    // Update stock
    window.updateStock = function (id, newStock) {
        if (newStock <= 0) {
            alert('Stock must be greater than 0.');
            return;
        }

        fetch('update_stock.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, stock: parseInt(newStock) })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Stock updated successfully!');
                fetchProducts(); // Refresh product list
            } else {
                alert('Error updating stock: ' + data.message);
            }
        })
        .catch(error => console.error('Error updating stock:', error));
    };

    // Edit product
    window.editProduct = function (id) {
        const newPrice = prompt('Enter new price:');
        const newStock = prompt('Enter new stock (grams):');

        // Validate inputs
        if (!newPrice || isNaN(newPrice) || parseFloat(newPrice) <= 0) {
            alert('Please enter a valid price greater than 0.');
            return;
        }
        if (!newStock || isNaN(newStock) || parseInt(newStock) <= 0) {
            alert('Please enter a valid stock quantity greater than 0.');
            return;
        }

        fetch('edit_product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, price: parseFloat(newPrice), stock: parseInt(newStock) })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product updated successfully!');
                fetchProducts(); // Refresh product list
            } else {
                alert('Error updating product: ' + data.message);
            }
        })
        .catch(error => console.error('Error updating product:', error));
    };

    // Delete product
    window.deleteProduct = function (id) {
        if (confirm('Are you sure you want to delete this product?')) {
            fetch('delete_product.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Product deleted successfully!');
                    fetchProducts(); // Refresh product list
                } else {
                    alert('Error deleting product: ' + data.message);
                }
            })
            .catch(error => console.error('Error deleting product:', error));
        }
    };

    // Initial fetch of products
    fetchProducts();
});