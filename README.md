Micro_Instagram

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



###
** API Endpoints **

1. GET /users/posts
* Description: Fetches all the posts along with user details.
* Response:
 [
  {
    "post_id": 1,
    "title": "My First Post",
    "description": "This is a description of my first post.",
    "images": ["image1.jpg", "image2.jpg"],
    "user_id": 1,
    "user_name": "Ramesh",
    "mobile_number": "1234567890",
    "address": "Vijayawada"
  }
]

  
2. POST  /posts
* Description: Create a new post for a user.
* Request Body:
{
  "title": "Post Title",
  "description": "Post description",
  "user_id": 1,
  "images": ["image1.jpg", "image2.jpg"]
}
* Response:
Status: 200 OK
Message: Post Created Successfully.


3. PUT  /posts/:id
* Description: Update an existing post by post ID.
* Request Body:
{
  "title": "Updated Post",
  "description": "Updated description",
  "user_id": 1,
  "images": ["updated_image.jpg"]
}
* Response:
Status: 200 OK
Message: Post Details Updated Successfully


4. DELETE /posts/:id
* Description: Delete a post by ID.
* Response:
Status: 200 OK
Message: Deleted Successfully.


5. GET /posts
* Description: Fetch all posts in the system.
* Response:
[
  {
    "id": 1,
    "title": "Sample Post",
    "description": "Sample description",
    "user_id": 1,
    "images": ["image1.jpg"]
  }
]


6. GET /users
* Description: Fetch all users in the system.
* Response:
[
  {
    "id": 1,
    "name": "Sam",
    "moile_number": "2234532312",
    "addresss": "Vijayawada,
  
  }
]



   
