// script.js

// جلب البيانات من API "Men's Clothing"
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())  // تحويل البيانات إلى JSON
    .then(data => {
        const productsContainer = document.getElementById('products-container');

        // التأكد من وجود المنتجات
        if (data && data.length > 0) {
            data.forEach(product => {
                // بناء HTML للمنتج
                const productCard = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.title}" title="${product.title}" />
                        <div class="product-info">
                            <h3>${product.title}</h3>
                            <p>$${product.price}</p>
                        </div>
                        <button class="add-to-cart"><a href="../pages/product-details.html?id=${product.id}">Details</a></button>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">Cart</button>
                    </div>
                `;
                // إضافة المنتج إلى الـ container
                productsContainer.innerHTML += productCard;
            });
        } else {
            productsContainer.innerHTML = '<p>No products available</p>';
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
