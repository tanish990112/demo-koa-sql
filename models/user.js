const Sequelize = require('sequelize');
const dataType = Sequelize.DataTypes;


const db = new Sequelize('test','tanish','Tanish@11',{
    host:'localhost',
    dialect: 'mysql',

});


db.authenticate()
    .then(()=>console.log("Connection Worked"))
    .catch((err)=> console.log(err))



const user = db.define('user',{
    username: {
        type: dataType.STRING(40),
        allowNull: false,
        unique : true

},
    password: {
        type: dataType.STRING,
        allowNul: false
    }
})

/* db.sync({alter: true})
    .then(()=> console.log("synchronised"))
    .catch((err)=>console.log(err)) */


module.exports = {db,user};