import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Story = db.define('story', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    category: DataTypes.STRING,
    story_cover: DataTypes.STRING,
    tags: DataTypes.STRING,
    status: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default Story;

(async() => {
    await db.sync();
})();