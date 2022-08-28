const { mongoose }  = require('mongoose');
const config = require('../../config');
const database = config.get('database');

exports.createConnection = async () => {
    let uri = `${database.host}://${database.user}:${database.password}@${database.cluster}.cqjke.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(
            uri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log("Mongoose is connected")
        );
    } catch (e){
        console.error(e);
    }
};

exports.disconnectConnection = async () => {
    try {
        await mongoose.disconnect();
        console.log('Mongoose was disconnected')
    } catch (e){
        console.error(e);
    }
};
