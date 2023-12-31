document.addEventListener('DOMContentLoaded', () => {
  

  const productList = document.getElementById('product-list');
  
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
      // Select the "Add to Cart" button inside the modal and add an event listener
      const addToCartButton = $target.querySelector('.add-to-cart');
      addToCartButton.addEventListener('click', function () {
        // Add your logic for adding the product to the cart here
        const productId = addToCartButton.id;
        
        addToCart(productId);
        
        alert('Product added to cart: '+productId);
        });
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });



  //method to add the product to the cart
  function addToCart(productId){
    //get existing cart items from storage
    const cartItems = getCartItems();
    //check if the product is already in the cart; make an index of items with the same id already in cart
    const existingItemindex = cartItems.findIndex(item => item.id === productId);
    if(existingItemindex !== -1){
      //the index isn't empty, so the items already in the cart
      cartItems[existingItemindex].quantity++; //recognize that the item is put in the cart twice or more (quantity of appearances in cart)
    } else{
      //add the item, quantity is 1
      cartItems.push({...productId, quantity:1});
    }

    
    saveCartItems(cartItems); //save what we just added to the cart

  }

  //retrieve cart items from local storage,
  //so we can access what's in the cart more easily
  function getCartItems(){
    const storedCartItems = localStorage.getItem('cart'); //find items with the key 'cart'
    // Check if there are stored cart items
    // If there are, parse the JSON string into a JavaScript object and return it
    // If not, return an empty array
    return storedCartItems ? JSON.parse(storedCartItems) : []; 
  }

  //save cart items to local storage
  function saveCartItems(cartItems){
    localStorage.setItem('cart', JSON.stringify(cartItems));
    //turn the javascript object cartItem into a JSON string, and give it the key 'cart'
    
  }

});