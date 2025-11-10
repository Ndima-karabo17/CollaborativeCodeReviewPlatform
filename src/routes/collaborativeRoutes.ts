import { Router } from "express";
import {addProject, getAllProjects, getProjectById, updateProjectById} from '../controllers/collaborativeControllers'
import { protect } from "../middleware/authMiddleware";

const router = Router();
router.use(protect)

router.post('/projects', addProject);
router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);
router.get('/projects:id',updateProjectById);


export default router;
