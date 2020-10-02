const conn=require("../lib/MongoUtils");

const getContents=(callback)=> 
conn.then(client=>{
    client.db("contentdb")
    .collection("content")
    .find({})
    .toArray((err,data)=>{
        console.log(data);
callback(data);
    });
});

const getContent=(ts, callback)=> {
conn.then(client=>{
    client.db("contentdb")
    .collection("content")
    .findOne({ts})
    .then((result)=>{
callback(result);
    });
});
};

const addContent =(content)=>{
    conn.then((client)=>{
        client.db("contentdb")
        .collection("content")
        .insertOne(content);
    })
}

const updateContent =(ts, content,callback)=>{
    conn.then((client)=>{
        client.db("contentdb")
        .collection("content")
        .updateOne({ts},{$set:{name:content.name, message:content.message}}).then((result)=>{
            callback(result);
        });
    })
}

const deleteContent =(ts,callback)=>{
    conn.then((client)=>{
        client.db("contentdb")
        .collection("content")
        .deleteOne({ts})
        .then((result)=>{
            callback(result);
        });
    })
}

const content={getContents,getContent, addContent, updateContent, deleteContent}
module.exports=content;