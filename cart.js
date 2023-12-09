let cart = [];

// Function to add a product to the cart
function addToCart(product) {
    cart.push(product);
    // You can optionally save the 'cart' variable in localStorage for persistence
}

// Function to remove a product from the cart by its index
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        // You can also update localStorage here if needed
    }
}

// Function to get the total price of the items in the cart
function getTotalPrice() {
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);
    return totalPrice.toFixed(2);
}

// Function to get the cart items
function getCartItems() {
    return cart;
}

// Export the functions so they can be used in other JavaScript files
export { addToCart, removeFromCart, getTotalPrice, getCartItems };

