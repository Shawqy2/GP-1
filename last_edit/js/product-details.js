// استرجاع الـ id من الـ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// جلب تفاصيل المنتج بناءً على الـ id
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <img src="${product.image}" alt="${product.title}" id="product_img"/>
            <h3 id="product_name">${product.title}</h3>
            <p id="product_price">$${product.price}</p>
            <p id="product_description">${product.description}</p>
            <a href="../pages/product-details.html?id=${product.id}" class="add-to-cart">BUY</a>
            <button class="add-to-cart">TRY</button>

        `;
    })
    .catch(error => {
        console.log('Error:', error);
        document.getElementById('product-details').innerHTML = '<p>Product not found</p>';
    });