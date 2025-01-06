const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const {open} = require("sqlite");
const path = require("path");
const dbPath = process.env.DB_PATH || path.join(__dirname, 'my_database.db');
require('dotenv').config();
let db = null;
app.use(express.json())

const dbAndServerConnection = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server started at http://localhost:${process.env.PORT || 3000}`);
        });
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};


//Get the posts of the users
app.get("/users/posts", async (request,response)=> {
    try{
        const getUsersPostsQuery = `SELECT 
            Posts.id AS post_id,
            Posts.title,
            Posts.description,
            Posts.images,
            Users.id AS user_id,
            Users.name AS user_name,
            Users.mobile_number,
            Users.address
        FROM Posts INNER JOIN  Users ON Posts.user_id = Users.id;`
        const responseQuery = await db.all(getUsersPostsQuery);
        response.send(responseQuery)
    }catch(error){
        console.log(error.message)
        response.status(500).send({ error: "An error occurred while fetching user posts." });
    }

})

app.get('/', (request, response) => {
    response.send("Welcome to the API!"); // Or any other message you prefer
});


// Create a post for the user
app.post('/posts', async (request, response) => {
    const { title, description, user_id, images } = request.body;
    try {
        const postUserQuery = `
            INSERT INTO Posts(title, description, user_id, images) VALUES(?, ?, ?, ?);`;
            await db.run(postUserQuery, [title, description, user_id, JSON.stringify(images)]);
        response.send("Post Created Successfully.");
    } catch (error) {
        console.error(error.message);
        response.status(500).send("An error occurred while creating the post.");
    }
});



//UPDATE the post of a user
app.put("/posts/:id", async (request, response) => {
    const { title, description, user_id, images } = request.body;
    const { id } = request.params;
    try {
        // Check if post exists before updating the posts.
        const checkPostQuery = `SELECT * FROM Posts WHERE id = ?`;
        const post = await db.get(checkPostQuery, [id]);
        if (!post) {
            return response.status(404).send({ error: "Post not found." });
        }
        const putQuery = `UPDATE Posts SET title = ?,  description = ?, user_id = ?, images = ? WHERE id = ?;`;
        await db.run(putQuery, [title, description, user_id, JSON.stringify(images), id]);
        response.status(200).send('Post Details Updated Successfully');
    } catch (error) {
        console.error(error.message);
        response.status(500).send({ error: "An error occurred while updating the post." });
    }
});



// DELETE a post of the user
app.delete("/posts/:id" , async (request,response)=> {
    const {id} = request.params
    try{
        // Here I am checking whether the post is available or not before trying to delete.
        const postQuery = `SELECT * FROM Posts WHERE id = ?`;
        const postResponse = await db.get(postQuery, [id])
        if (!postResponse) {
            return response.status(404).send({ error: "Post not found." });
        }
        const deleteQuery = `DELETE FROM Posts WHERE id=?`;
        await db.run(deleteQuery, [id])
        response.status(200).send("Deleted Successfully.");  
    }catch(error){
        console.log(error.message)
        response.status(500).send({ error: "An error occurred while deleting the post." });
    }
})



// GET all posts 
app.get("/posts", async (request,response) => {
    try{
        const postsQuery = `SELECT * FROM Posts`;
        const responseQuery = await db.all(postsQuery)
        response.send(responseQuery)
    }catch(error){
        console.log(error.message)
        response.status(500).send({ error: "An error occurred while fetching posts." });
    }
})



// GET all users 
app.get("/users", async (request,response) => {
   try{
    const usersQuery = `SELECT * FROM Users`;
    const responseUsersQuery = await db.all(usersQuery)
    response.send(responseUsersQuery)
   }catch(error){
        console.log(error.message)
        response.status(500).send({ error: "An error occurred while fetching users." });
   }
})

dbAndServerConnection();