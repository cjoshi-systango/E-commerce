import { Sequelize } from "sequelize";

const sequelize = new Sequelize('e-commerce','root','root',{
    dialect: "mysql",
})

// sequelize.authenticate()
// .then(()=>{
//     console.log("connection established");    
// })
// .catch(err=>{
//     console.log("not connected" + err);
    
// })

export default sequelize;