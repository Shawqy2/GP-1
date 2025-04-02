document.addEventListener("DOMContentLoaded", function () {
    loadCart();

    document.querySelectorAll('input[name="shipping"]').forEach(option => {
        option.addEventListener("change", updateTotal);
    });
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let subtotalElement = document.getElementById("subtotal");
    let totalElement = document.getElementById("total");

    cartItems.innerHTML = "";
    let subtotal = 0;

    cart.forEach(product => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="product">
                    <img src="${product.image}" alt="">
                    <div>
                        <p>${product.name}</p>
                    </div>
                </div>
            </td>
            <td>${product.price}$</td>
            <td>
                <button class="decrease btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                <span class="quantity">${product.quantity}</span>
                <button class="increase btn" onclick="changeQuantity(${product.id}, 1)">+</button>
            </td>
            <td class="total-price">${(product.price * product.quantity).toFixed(2)}$</td>
            <td><button class="remove btn" onclick="removeFromCart(${product.id})">×</button></td>
        `;
        cartItems.appendChild(row);

        subtotal += product.price * product.quantity;
    });

    subtotalElement.innerText = subtotal.toFixed(2) + "$";
    updateTotal();
}

function changeQuantity(id, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = cart.find(item => item.id === id);
    if (product) {
        product.quantity += amount;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function updateTotal() {
    let subtotal = parseFloat(document.getElementById("subtotal").innerText.replace("$", "")) || 0;
    let shippingCost = parseFloat(document.querySelector('input[name="shipping"]:checked')?.value) || 0;

    document.getElementById("shipping-cost").innerText = shippingCost === 0 ? "Free" : shippingCost.toFixed(2) + "$";
    document.getElementById("total").innerText = (subtotal + shippingCost).toFixed(2) + "$";
}
