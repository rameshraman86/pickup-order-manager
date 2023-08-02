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
          const dishHTML = `
          <div>
              <span class="dish-name">Name: </span> ${dish.name}
              <span class="dish-description">Description: </span> ${dish.description}
              <span class="dish-type">Type: </span> ${dish.dish_type}
              <span class="dish-price">Price: </span> ${dish.price}
              <span class="dish-rating">Rating: </span> ${dish.rating}



              <button type="submit" id="btn-addcart">Add to cart</button>
              <button type="submit" id="btn-delete">Delete</button>
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

$(document).ready(() => {
  populateDishes();
});
