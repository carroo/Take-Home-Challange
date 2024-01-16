import path from "path";
import fs from "fs";
import Chapter from "../models/ChapterModel.js";

export const getChapter = async(req, res) => {
    try {
        const response = await Chapter.findAll({
            where: {
                story_id: req.params.story_id
            },
            order: [
                ['createdAt', 'ASC']
            ],
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getChapterById = async(req, res) => {
    try {
        const response = await Chapter.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.error("Error fetching or creating Chapter:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const saveChapter = async(req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const story_id = req.params.story_id;
    try {
        await Chapter.create({ title: title, story_id: story_id, content: content });
        res.status(201).json({ msg: "Chapter Created Successfuly" });
    } catch (error) {
        console.log(error.message);
    }

}

export const updateChapter = async(req, res) => {
    const chapter = await Chapter.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!chapter) return res.status(404).json({ msg: "No Data Found" });

    const title = req.body.title;
    const content = req.body.content;

    try {
        await Chapter.update({ title: title, content: content }, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Chapter Updated Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteChapter = async(req, res) => {
    const chapter = await Chapter.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!chapter) return res.status(404).json({ msg: "No Data Found" });

    try {
        await Chapter.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Chapter Deleted Successfuly" });
    } catch (error) {
        console.log(error.message);
    }
}