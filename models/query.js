const {db,user} = require('./user')


const add =  async(uname,pass)=>{
    try{
        await db.sync()
        await user.create({
            username: uname,
            password : pass
             
        })
    }catch(e) {
        console.log(e);
    }
}

const viewAll = async()=>{
    try{
        await db.sync();
        const people = [];
        const users = await user.findAll();
        users.forEach(user => people.push(user.dataValues.username));
        return  people;

    }catch(e){
        console.error(e);
    }
}

const findUser = async(uname)=>{
    try{
        await db.sync();
        let us;
        const users = await user.findAll({ 
            where : { username: uname}
        });
        users.forEach(user =>  us = user.dataValues);
        return us;
        
    }catch(e){
        console.error(e);
    }
}

module.exports = {add,viewAll,findUser};