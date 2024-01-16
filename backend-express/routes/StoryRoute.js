import express from "express";
import {
    getStory,
    getStoryById,
    saveStory,
    updateStory,
    deleteStory,
    getWhereStory,
} from "../controllers/StoryController.js";

const router = express.Router();

router.get('/Story', getStory);
router.post('/Story-where', getWhereStory);
router.get('/Story/:id', getStoryById);
router.post('/Story', saveStory);
router.patch('/Story/:id', updateStory);
router.delete('/Story/:id', deleteStory);

export default router;