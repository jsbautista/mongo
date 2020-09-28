const {DataTypes, Model} = require("sequelize");
const sequelize=require("../lib/sequelize")
class Content extends Model{}
Content.init(
    {
        
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        message:{
            type:DataTypes.STRING,
            allowNull: false
        },
        ts:{
            type:DataTypes.STRING,
            allowNull: false
        },
        
        
    },
    {
        sequelize,
        modelName:"Content",
    }
);

Content.sync();

module.exports = Content;