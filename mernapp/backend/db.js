// const mongoose = require('mongoose');

// const mongoURI = 'mongodb address';

// const connectToMongo = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("Connected to MongoDB");

//         const foodCollection = await mongoose.connection.db.collection("foodData2");
//         const data = await foodCollection.find({}).toArray();
//             global.food_items=foodCollection;
//         const categoryCollection = await mongoose.connection.db.collection("Categories");
//         const Catdata = await categoryCollection.find({}).toArray();


//         return { data, Catdata };
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);

//         throw err;
//     }
// };

// module.exports = connectToMongo;


const mongoose = require('mongoose');

const mongoURI = 'mongodb://gofood:Prajnesh%402001@cluster0-shard-00-00.reyts.mongodb.net:27017,cluster0-shard-00-01.reyts.mongodb.net:27017,cluster0-shard-00-02.reyts.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-zud2s3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // This option is recommended for new mongoose projects
        });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("foodData2").find({}).toArray();
        const foodCategoryData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        global.foodData2 = fetched_data;
        global.foodCategory = foodCategoryData;

        console.log("Data fetched and stored in global variables");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;

