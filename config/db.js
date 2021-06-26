const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');
require('dotenv').config();
// const config = require('config');
// const uri = config.get('mongoURI');

// const connectDB = async () => {

//  const client = new MongoClient(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// 	try {
//         await client.connect(err => {
//             const dbName = 'test';
// 		 const collection = client.db(dbName).collection("devconnector");
		
       
//             return collection
// 			 });

// 		console.log('MongoDB Connected...');
// 	} catch (err) {
// 		console.error(err.message);
// 		process.exit(1);
// 	}
// };



// module.exports = connectDB;


const connectDB = async () => {
	try {
		await mongoose.connect(process.env.mongoURI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;