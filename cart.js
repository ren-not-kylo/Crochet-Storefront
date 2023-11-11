document.addEventListener('DOMContentLoaded', function(){
  const cartItemsContainer = document.getElementById('cart-items');
  const submitOrderButton = document.getElementById('submit-order-button');
  const cartItems = getCartItems();

  displayCartItems(cartItems);

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

      const submitButton = $target.querySelector('#submit-form-button');
      submitButton.addEventListener('click', function () {
        //will eventually send an email with the details to chelsea.ren.b@gmail.com

        alert('Thank you for visiting my shop! I will contact you shortly about the details of your order.');
        clearCart();
        closeModal($target);
        //show the updated display
        displayCartItems(getCartItems());
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


  function displayCartItems(cartItems){
    //display the data of each cart item using innerHTML
    cartItems.forEach(item => {
      console.log("ITEM: "+item);
      const itemCard = document.createElement('div');
  
      itemCard.innerHTML = `
        <div class="card ml-2 mr-2">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img
                            src="crochet photos/headphone_sprout2.jpg"
                            alt="Placeholder image"
                            />
                        </figure>
                    </div>
                    <div class="content">
  
                        <h2>Headphone Sprout</h2>
                        <p>$5</p>
  
                    </div>
                </div>
  
            </div>
        </div>
      `;

      cartItemsContainer.appendChild(itemCard);
    
    });
  }


  //retrieve cart items from local storage,
  //so we can access what's in the cart more easily
  function getCartItems(){
    const storedCartItems = localStorage.getItem('cart');
    console.log("stored cart items: "+storedCartItems);
    //find items with the key 'cart'
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
  
  function clearCart(){
    //empty the cartItem list by replacing it with an empty array
    saveCartItems([]);
  }

  
});