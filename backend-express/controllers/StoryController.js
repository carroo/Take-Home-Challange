import path from "path";
import fs from "fs";
import Story from "../models/StoryModel.js";
import { Sequelize } from "sequelize";

export const getStory = async(req, res) => {

    try {
        const whereClause = {};

        if (req.category) {
            whereClause.category = req.category;
        }

        if (req.status) {
            whereClause.status = req.status;
        }

        const searchQuery = req.search ? req.search : "";

        const response = await Story.findAll({
            where: {
                [Sequelize.Op.or]: [{
                        title: {
                            [Sequelize.Op.like]: `%${searchQuery}%`
                        }
                    },
                    {
                        author: {
                            [Sequelize.Op.like]: `%${searchQuery}%`
                        }
                    },
                ],
                ...whereClause, // Include other conditions
            },
            order: [
                ['createdAt', 'ASC']
            ],
        });

        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getWhereStory = async(req, res) => {

    try {
        const whereClause = {};

        if (req.body.category) {
            whereClause.category = req.body.category;
        }

        if (req.body.status) {
            whereClause.status = req.body.status;
        }

        const searchQuery = req.body.search ? req.body.search : "";

        const response = await Story.findAll({
            where: {
                [Sequelize.Op.or]: [{
                        title: {
                            [Sequelize.Op.like]: `%${searchQuery}%`
                        }
                    },
                    {
                        author: {
                            [Sequelize.Op.like]: `%${searchQuery}%`
                        }
                    },
                ],
                ...whereClause, // Include other conditions
            },
            order: [
                ['createdAt', 'ASC']
            ],
        });

        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getStoryById = async(req, res) => {
    try {
        const [story, created] = await Story.findOrCreate({
            where: {
                id: req.params.id
            },
            defaults: {
                // Definisi nilai default untuk kolom jika data tidak ditemukan
                title: '',
                author: '',
                synopsis: null,
                category: null,
                story_cover: null,
                tags: null,
                status: null
            }
        });

        if (created) {
            // Data baru telah dibuat
            console.log("New story created:", story.id);
        }

        res.json(story);
    } catch (error) {
        console.error("Error fetching or creating story:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const saveStory = (req, res) => {
    //res.json(req.body);
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const synopsis = req.body.synopsis;
    const category = req.body.category;
    const tags = req.body.tags;
    const status = req.body.status;
    const file = req.files.story_cover;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async(err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            //res.json({ title: title, author: author, synopsis: synopsis, category: category, story_cover: url, tags: tags, status: status });
            await Story.create({ id: id, title: title, author: author, synopsis: synopsis, category: category, story_cover: url, tags: tags, status: status });
            res.status(201).json({ msg: "Story Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateStory = async(req, res) => {
    const story = await Story.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!story) return res.status(404).json({ msg: "No Data Found" });

    let fileName = "";
    let filepath;
    if (req.files === null) {
        fileName = story.story_cover;
        filepath = fileName;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        filepath = `${req.protocol}://${req.get("host")}/images/${fileName}`;

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }
    const title = req.body.title;
    const author = req.body.author;
    const synopsis = req.body.synopsis;
    const category = req.body.category;
    const tags = req.body.tags;
    const status = req.body.status;
    const url = filepath;

    try {
        await Story.update({ title: title, author: author, synopsis: synopsis, category: category, story_cover: url, tags: tags, status: status }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Story Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteStory = async(req, res) => {
    const story = await Story.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!story) return res.status(404).json({ msg: "No Data Found" });

    try {
        const filepath = `./public/images/${story.story_cover}`;
        await Story.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Story Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}