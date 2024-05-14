# Food Explorer API📁

The API developed in Node.js offers a robust and flexible solution for efficiently managing users, administrators, and the restaurant's menu. With features including user and administrator registration, along with the ability to create, edit, associate ingredients with, and delete dishes, as well as support for uploading images for the dishes, this API provides a comprehensive experience for restaurant management. Additionally, users authenticate using JWT tokens for enhanced security.

[Front-end repository](https://github.com/leonardomenezes7/foodexplorer_frontend)

## Structure🧱
![rest](https://github.com/leonardomenezes7/food_explorer_api/assets/145611761/167db63d-fa8e-40ab-9634-36a460e5ea49)

## Features🔑
- Registration of new users and admins with basic information such as username, email, password (encrypted).
- Generation of JWT tokens to authenticate users during API requests.
- Protection of sensitive routes and operations, requiring valid authentication by JWT token.
- The API architecture is developed using Node.js, leveraging frameworks such as Express.js for routing and middleware control, and JWT for user authentication. Data is stored in a SQLite , to ensure persistence and scalability.
- Admins can create dishes, update and delete.
- Ingredients related with dishes
- Dishes image upload

## Technologies Used💻
- Node.js
- SQLite
- Express.js
- JWT
- knex.js
- bcrypt
- Multer
- cors

## Database Structure💾
![image](https://github.com/leonardomenezes7/food_explorer_api/assets/145611761/d6b7fd7c-bec2-4e52-ac83-b3ba1a195563)

### Developed by Leonardo Menezes

