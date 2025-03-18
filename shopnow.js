const cart = [];

// Function to add a book to the cart
function addToCart(book) {
    cart.push(book);
    alert(`${book.name} has been added to your cart.`);
}

// Function to update the cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = ''; 
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        const itemImage = document.createElement('img');
        itemImage.src = item.image; 
        itemImage.alt = item.name;
        itemImage.classList.add('book-image');

        const itemText = document.createElement('span');
        itemText.textContent = `${item.name} - $${item.price.toFixed(2)}`; 

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => {
            cart.splice(index, 1); 
            updateCart(); 
        });

        itemDiv.appendChild(itemImage);
        itemDiv.appendChild(itemText);
        itemDiv.appendChild(removeButton);
        cartItemsDiv.appendChild(itemDiv);
        total += item.price; 
    });

    cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`; 
}

document.getElementById('cart-btn').addEventListener('click', () => {
    updateCart(); 
    document.getElementById('cart-modal').style.display = 'block'; 
});

document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none'; 
});


window.addEventListener('click', (event) => {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.style.display = 'none'; 
    }
});
