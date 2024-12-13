const { ObjectId } = require('mongodb');
const { client } = require('../db/db.js');

const createData = async (datos) => {

    try {
        
        await client.connect();
        const database = client.db('Library');
        const collection = database.collection('Books');
        const result = await collection.insertOne(datos);
        
        return result.insertedId;

    } catch (error) {

        console.log(error);
    }
    
}

const readData = async () => {

    try {
        await client.connect();
        const database = client.db('Library');
        const collection = database.collection('Books');
        
        
        return await collection.find({}).toArray();

    } catch (error) {

        console.log(error);
    }
    
}

const updateData = async (id, datos) => {

    try {
        await client.connect();
        const database = client.db('Library');
        const collection = database.collection('Books');
        const result = await collection.updateOne({

            _id: new ObjectId(id)
        }, {
            $set: datos
        });
        
        return result.modifiedCount;

    } catch (error) {

        console.log(error);
    }
    
}

const deleteData = async (id) => {

    try {
        await client.connect();
        const database = client.db('Library');
        const collection = database.collection('Books');
        const result = await collection.deleteOne({
            
            _id: new ObjectId(id)

        });

        return result.deletedCount;

    } catch (error) {

        console.log(error);
    }
    
}

module.exports = { createData, readData, updateData, deleteData }