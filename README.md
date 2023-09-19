# Pickup Order Manager

Full-stack multi-page web application designed to offer a complete solution for restaurants. It not only showcases the restaurant's menu but also provides customers with the ability to place pickup orders and receive notifications when their food is ready. 

Additionally, it empowers restaurant owners to efficiently manage both incoming and existing orders, provide pickup ETAs, and notify customers when their orders are ready for pickup.


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
- Ensure you have Node.js and npm (Node Package Manager) installed on your system.

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
