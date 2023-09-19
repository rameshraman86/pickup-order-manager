# Pickup Order Manager

Full-stack multi-page web application designed to offer a complete solution for restaurants. The app allows restaurant owners to efficiently manage incoming and existing orders, provide pickup ETAs, and notify their customers when orders are ready for pickup.
Additionally, it provides restaurants the ability to manage their public menu and allow customers to place order.


## Technology Stack

**Architecture:** MVC (Model-View-Controller)

**Frontend:**
- Native Javascript
- AJAX, EJS Templates
- SCSS

**Backend:**
- Express
- Node.js
- PostgreSQL

**API Integrations:**
- Twillio API


## Project Setup Instructions

### Prerequisites:
- Ensure you have Node.js, npm (Node Package Manager), postgreSQL installed on your system.

### Setup Instructions:

1. **Clone the Repository:**
   - Start by cloning the project repository from GitHub. You can do this by running the following command in your terminal:

     ```bash
     git clone <repository_url>
     ```

   Replace `<repository_url>` with the actual URL of your GitHub repository.

2. **Install Dependencies:**
     ```bash
     npm install
     npm run db:reset
     ```

3. **Start the development server:**

     ```bash
     npm run start
     ```
