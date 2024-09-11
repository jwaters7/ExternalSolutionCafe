// Function to add product to localStorage
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPreview();
}

// Function to update the cart preview on index.html
function updateCartPreview() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total');

    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price);
    });

    if (cartCountElement && cartTotalElement) {
        cartCountElement.innerText = `Items in Cart: ${cart.length}`;
        cartTotalElement.innerText = `Total: $${total.toFixed(2)}`;
    }
}

// Function to display cart items in cart.html
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');

    let total = 0;
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price}</p>
            <button class="remove-from-cart" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += parseFloat(item.price);
    });

    if (totalPriceContainer) {
        totalPriceContainer.innerText = `Total: $${total.toFixed(2)}`;
    }
}

// Function to remove product from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartPreview();
}

// Event listener for "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    // Handle "Add to Cart" buttons on index.html
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const product = {
                id: productElement.getAttribute('data-id'),
                name: productElement.getAttribute('data-name'),
                price: productElement.getAttribute('data-price')
            };
            addToCart(product);
            alert(`${product.name} has been added to your cart.`);
        });
    });

    // Update the cart preview when the page loads on index.html
    if (window.location.pathname.endsWith('index.html')) {
        updateCartPreview();
    }

    // Display cart items if on cart.html
    if (window.location.pathname.endsWith('cart.html')) {
        displayCartItems();
    }
});

//Displays the current time in the index.html document every 1000ms (1 second)
window.onload = function() {
    const interval = setInterval(function() {
        var currentTime = new Date();
        document.getElementById("datetime").innerHTML = currentTime;
        //Checks the time for the day and hour, to determine whether the cafe is open.
        currentTime.getHours();
        currentTime.getDay();
        //Checks to see whether the cafe is open on weekdays
        if (currentTime.getDay() > 1-5) {
            if (currentTime.getHours() > 8-15) {
                var openCheck = "The cafe is currently open, come on in!";
            } else {
                var openCheck = "The cafe is currently closed, please try again later";
            }
        } else {
        //Checks to see whether the cafe is open on weekends
            if (currentTime.getHours() > 7-14) {
                var openCheck = "The cafe is currently open, come on in!";
            } else {
                var openCheck = "The cafe is currently closed, please try again later";
            }
        }
        document.getElementById("openOrNot").innerHTML = openCheck;
    }, 1000);
}
