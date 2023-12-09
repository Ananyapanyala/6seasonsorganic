// Sample product data
const products = [
    {
        name: 'Forest Honey',
        description: 'Experience the natural sweetness of our Pure Organic Honey, a golden elixir straight from the heart of pristine, pesticide-free meadows. Sourced from the hives of local, eco-conscious beekeepers, our honey is as pure as the wildflowers it comes from.',
        price: 10.00,
        imageUrl: 'honeypro1.jpg'
    },
    {
        name: 'Product 1 (Cosmetics)',
        description: 'Product 1 description goes here.',
        price: 15.00,
        imageUrl: 'product1.jpg'
    },
    // Add more product objects here
];

const cart = [];

function updatePrice(product) {
    const quantity = parseFloat(document.getElementById(`quantity${product}`).value);
    const weight = parseFloat(document.getElementById(`weight${product}`).value);
    const priceElement = document.getElementById(`price_product${product}`);

    const basePrice = product === 1 ? 10.00 : 15.00;
    const pricePerGram = basePrice * 0.001;

    const newPrice = ((basePrice * quantity) + (pricePerGram * weight)).toFixed(2);

    priceElement.textContent = newPrice;
}

function showCategory(category) {
    if (category === 'food') {
        document.getElementById('food-products').style.display = 'block';
        document.getElementById('cosmetics-products').style.display = 'none';
    } else if (category === 'cosmetics') {
        document.getElementById('food-products').style.display = 'none';
        document.getElementById('cosmetics-products').style.display = 'block';
    }
}

// Function to add a product to the cart
function addToCart(product) {
    const selectedProduct = products[product - 1];
    cart.push(selectedProduct);
    updateCartDisplay();
    updateCartTotal();
    alert(`Added ${selectedProduct.name} to the cart.`);
}

// Function to update the cart display
function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.className = 'cart-item';

        const productName = document.createElement('span');
        productName.textContent = product.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeItemFromCart(index));

        cartItem.appendChild(productName);
        cartItem.appendChild(removeButton);
        cartList.appendChild(cartItem);
    });
}

// Function to update the total price in the cart
function updateCartTotal() {
    const totalElement = document.getElementById('cart-total');
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);
    totalElement.textContent = totalPrice.toFixed(2);
}

// Function to remove an item from the cart
function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartTotal();
}

// Function to show the shopping cart modal
function showCart() {
    if (window.location.pathname.includes('.html')) {
        const modal = document.getElementById('cart-modal');
        modal.style.display = 'block';
        updateCartDisplay();
        updateCartTotal();
    }
}

// Function to close the shopping cart modal
function closeCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Add an event listener to the cart button to open the modal
const cartButton = document.getElementById('cart-button');
cartButton.addEventListener('click', showCart);

// Add an event listener to the close button in the modal to close it
const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', closeCart);

// Close the modal when the user clicks outside of it
window.addEventListener('click', function (event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        closeCart();
    }
});

// Check if we are on the main page, then show the shopping cart in the navigation bar
if (window.location.pathname.includes('index.html')) {
    const cartInNavBar = document.createElement('li');
    cartInNavBar.innerHTML = '<a href="cart.html">View Cart</a>';
    const menu = document.querySelector('.menu');
    menu.appendChild(cartInNavBar);
}
document.addEventListener('DOMContentLoaded', function () {
    const scrollLinks = document.querySelectorAll('.scroll-link');

    scrollLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// scriptcart.js

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cartParam = urlParams.get("cart");
    const cart = JSON.parse(cartParam);

    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    // Function to calculate the total price
    function calculateTotalPrice(cartItems) {
        return cartItems.reduce((total, item) => total + item.price, 0);
    }

    // Function to update the cart display
    function updateCartDisplay() {
        cartList.innerHTML = ''; // Clear the list

        cart.forEach(function (item) {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartList.appendChild(listItem);
        });

        const totalPrice = calculateTotalPrice(cart);
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    updateCartDisplay();
});
