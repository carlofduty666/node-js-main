const { MongoClient} = require('mongodb');

const client = new MongoClient('mongodb+srv://carlofdutyy:46uE3pXLTgDwpTGQ@cluster0.6vlx3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

async function connectDB() {
    try {
        await client.connect();
        console.log('DB connected');    
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connectDB, client }