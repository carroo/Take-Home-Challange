import { Sequelize } from "sequelize";

const db = new Sequelize('bigio', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
});

export default db;