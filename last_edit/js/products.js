fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const productsContainer = document.getElementById('products-container');

        if (data && data.length > 0) {
            data.forEach(product => {
                const productCard = `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.title}" title="${product.title}" />
                        <div class="product-info">
                            <h3 title="${product.title}">${product.title}</h3>
                            <p>$${product.price}</p>
                        </div>
                        <button class="add-to-cart">
                            <a href="../pages/product-details.html?id=${product.id}">Details</a>
                        </button>
                        <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Buy</button>
                        <div id="toast-container"></div>
                    </div>
                `;
                productsContainer.innerHTML += productCard;
            });
        } else {
            productsContainer.innerHTML = '<p>No products available</p>';
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });

function addToCart(id, name, price, image) {
    console.log(`Adding ${name} to cart...`);  // تحقق إذا كانت الدالة تعمل بشكل صحيح

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();

    // إنشاء رسالة Toast
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `${name} has been added to your cart!`;

    // تحقق إذا كانت الرسالة تظهر في DOM
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
        toastContainer.appendChild(toast);
    } else {
        console.log('Toast container not found!');
    }

    // إزالة الرسالة بعد 3 ثواني
    setTimeout(() => {
        if (toastContainer) {
            toastContainer.removeChild(toast);
        }
    }, 3000);
}
