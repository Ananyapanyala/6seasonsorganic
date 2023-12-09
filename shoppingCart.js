
// Example shopping cart details


// Function to display cart details
function displayCartDetails() {
    const cartDetails = document.getElementById('cartDetails');

    // Clear the previous content
    cartDetails.innerHTML = '';

    // Create elements to display cart details
    const cartTitle = document.createElement('h2');
    cartTitle.textContent = 'Shopping Cart';
    cartDetails.appendChild(cartTitle);

    if (shoppingCart.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty';
        cartDetails.appendChild(emptyCartMessage);
    } else {
        shoppingCart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;
            productImage.classList.add('cart-item-image');
            cartItem.appendChild(productImage);

            const productName = document.createElement('p');
            productName.textContent = product.name;
            cartItem.appendChild(productName);

            const productPrice = document.createElement('p');
            productPrice.textContent = `$${product.price}`;
            cartItem.appendChild(productPrice);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeItem(product.id);
                displayCartDetails();
            });
            cartItem.appendChild(removeButton);

            cartDetails.appendChild(cartItem);
        });
    }
}

// Function to remove an item from the cart
function removeItem(productId) {
    const index = shoppingCart.findIndex(item => item.id === productId);
    if (index !== -1) {
        shoppingCart.splice(index, 1);
    }
}

// Call the function to display cart details
displayCartDetails();
