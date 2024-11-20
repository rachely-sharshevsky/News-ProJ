User Accessor Service
The User Accessor Service is responsible for managing the storage and retrieval of user data, including user authentication credentials, preferences, and profile details. This service directly interacts with the database and provides APIs to access or modify user data.

Features
Secure storage of user credentials with hashed passwords.
CRUD operations for managing user data.
Management of user preferences and categories.
Easy integration with other microservices.


Technologies Used
Node.js (JavaScript runtime)
Express.js (Web framework)
MongoDB (Database for user data storage)
Sequelize (ORM for database management)
Dapr (Inter-service communication)

Prerequisites
Ensure the following are installed and available:

Node.js (version 18 or higher)
MongoDB (for database storage)
Docker and Docker Compose (for containerization)
Dapr CLI (if using Dapr)

Installation
git clone https://github.com/your-repo/user-accessor-service.git
cd user-accessor-service
npm install

Environment Variables

PORT=4000
MONGO_URI=mongodb://localhost:27017/user_management
JWT_SECRET=your_jwt_secret
DAPR_HTTP_PORT=3500
DAPR_GRPC_PORT=50001
API Documentation
Base URL
The default base URL for the service is http://localhost:4000.

Endpoints
1. Create User
POST /api/users
Request Body:
json
Copy code

{
  "email": "user@example.com",
  "password": "securepassword",
  "fullName": "John Doe",
  "preferences": ["technology", "science"],
  "categories": ["news", "articles"]
}
Response

{
  "message": "User created successfully!",
  "userId": "unique_user_id"
}
2. Get User by ID
GET /api/users/:userId
Response
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "preferences": ["technology", "science"],
  "categories": ["news", "articles"]
}
3. Update User
PUT /api/users/:userId
Request Body:
json
Copy code
{
  "preferences": ["technology", "health"],
  "categories": ["blogs", "news"]
}
{
  "message": "User updated successfully!"
}
Running the Service
Locally
Start MongoDB:

bash
Copy code
mongod

Run the container:
docker run -p 4000:4000 --env-file .env user-accessor-service
Alternatively, use Docker Compose:
docker-compose up

Project Structure
user-accessor-service/
├── src/
│   ├── controllers/       # Handles API logic
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── app.js             # Main application file
├── test/                  # Test files
├── .env.example           # Example environment variables
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── package.json           # Node.js dependencies
└── README.md              # Documentation

Contributing
Contributions are welcome! Please open an issue or submit a pull request for significant change