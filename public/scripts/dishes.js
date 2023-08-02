//ADD TO HEAD OF EJS
const fetchDishes = () => {
  return $.ajax({
    url: '/api/dishes',
    method: 'GET',
    dataType: 'json',
  });
};

const populateDishes = () => {
  const showDishes = $('.show-dishes'); //Add to EJS

  fetchDishes()
    .then((dishes) => {
      if (dishes.length > 0) {
        // Clear existing content
        showDishes.empty();



        // Add the new orders to the "New Orders" section
        dishes.forEach((dish) => {
          dish.quantity = 0;
          const dishHTML = `
          <div>

              <span class="dish-name">Name: </span> ${dish.name}
              <span class="dish-description">Description: </span> ${dish.description}
              <span class="dish-type">Type: </span> ${dish.dish_type}
              <span class="dish-price">Price: </span> ${dish.price}
              <span class="dish-rating">Rating: </span> ${dish.rating}
            <span class="dish-quantity">Quantity: </span>
            <p class="dish-id-${dish.id}"> ${dish.quantity} </p>
            <button class="add-to-cart-button" data-dish-id="${dish.id}" dish-q = "${dish.quantity}">Add to Cart</button>
            <button class="delete-button" data-dish-id="${dish.id}" dish-q = "${dish.quantity}">Delete</button>
            </div>
          `;
          showDishes.append(dishHTML);
        });
      } else {
        // Handle the case when there are no orders
        showDishes.html('<p>No new orders available.</p>');
      }
    })
    .catch((error) => {
      console.error(error);
      showDishes.html('<p>Failed to fetch orders data.</p>');
    });





};


//Scripts go here to populate divs, make just the divs in the ejs, the fetchdishes is pulling from the api and is routed to the main server
$(document).ready(function() {
  populateDishes();
  // Event listener for "Add to Cart" button using event delegation
  $(document).on('click', '.add-to-cart-button', function() {
    const dishId = $(this).attr('data-dish-id');
    const dishQElement = $(`.dish-id-${dishId}`);
    let dishQ = dishQElement.text()
    dishQ = parseInt(dishQ);
    dishQ += 1;
    console.log(dishQ);
    $(`.dish-id-${dishId}`)[0].innerHTML = dishQ;

  });

  $(document).on('click', '.delete-button', function() {
    const dishId = $(this).attr('data-dish-id');
    const dishQElement = $(`.dish-id-${dishId}`);
    let dishQ = dishQElement.text()
    dishQ = parseInt(dishQ);
    if (dishQ > 0) {
      dishQ -= 1;
      console.log(dishQ);
      $(`.dish-id-${dishId}`).text(dishQ);
    } else {

      alert('Quantity cannot be less than 0');
    }

  });


});

