import {Sequelize} from "sequelize";
// Option 1: Passing parameters separately
const sequelize = new Sequelize('new', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDB;