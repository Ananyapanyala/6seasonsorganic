document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productName = this.parentElement.querySelector('h3').innerText;
            const productPrice = this.parentElement.querySelector('p').innerText;

            // You can add this product to the shopping cart here
            addToCart(productId, productName, productPrice);
        });
    });

    function addToCart(productId, productName, productPrice) {
        // Here, you can store the product details in local storage or perform other actions
        // For example, you might want to create an object and store it in local storage:
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1 // You might add quantity tracking as well
        };

        // Storing the product in local storage (you might need to handle duplicates, etc.)
        localStorage.setItem('cartProduct', JSON.stringify(product));
    }
});
function addToCart() {
    // Logic to add the product to the cart
    // For example:
    // Add the product to an array or perform the necessary actions to add it to the cart

    // Display a success message
    alert('Product added successfully!');
}
// Retrieve or initialize cart from localStorage
let shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a product to the cart
function addToCart(product) {
    shoppingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(shoppingCart));
    alert('Product added to cart!');
}
