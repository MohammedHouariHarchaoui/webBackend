import  express  from "express";
import {
    getUsers,
    getUserById,
    updateUser,
    activedesactivateUser,
    getUsersByIdRole 
} from '../services/User.js'
const router = express.Router();

router.get('/users',getUsers);
router.get('/users/:id',getUserById);
router.get('/users/role/:id',getUsersByIdRole)
// router.post('/users/add',createUser);
router.patch('/users/edit/:id',updateUser);
router.patch('/users/status/:id',activedesactivateUser );

export default router;