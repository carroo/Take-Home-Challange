import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Chapter = db.define('chapter', {
    title: DataTypes.STRING,
    story_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default Chapter;

(async() => {
    await db.sync();
})();