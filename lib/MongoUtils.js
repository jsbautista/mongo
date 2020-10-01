const {MongoClient} = require("mongod") ;

const url="mongodb://localhost:27017";

MongoClient.connect(url, {useUnifiedTopology:true});