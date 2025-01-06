# Project Name

## Description

This project is a simple web application built using Node.js and SQLite3. It allows users to create, read, update, and delete posts, with each post linked to a user.

## Features

- Create posts
- View all posts and details of users
- Update posts
- Delete posts

## Technologies Used

- Node.js
- SQLite3
- Express.js
- dotenv

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [SQLite3](https://www.sqlite.org/)

### Setup

1. Clone the repository:
   git clone https://github.com/your-username/project-name.git
   cd project-name

2. Install dependencies:
   npm install
   
4. Start the server:
   node index.js
   The server will start at http://localhost:3000.



API Endpoints
GET /users/posts
Fetch all posts with user details.

POST /posts
Create a new post.

Request Body:
{
  "title": "Post Title",
  "description": "Post description",
  "user_id": 1,
  "images": ["image1.jpg", "image2.jpg"]
}

PUT /posts/:id
Update an existing post by ID.

Request Body:
{
  "title": "Updated Title",
  "description": "Updated description",
  "user_id": 1,
  "images": ["image3.jpg"]
}

DELETE /posts/:id
Delete a post by ID.

GET /posts
Fetch all posts.

GET /users
Fetch all users.
   
