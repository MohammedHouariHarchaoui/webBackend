import  express  from "express";
import {
    getRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} from '../services/Role.js'
const router = express.Router();

router.get('/roles',getRoles);
router.get('/roles/:id',getRoleById);
router.post('/roles/add',createRole);
router.patch('/roles/edit/:id',updateRole);
router.delete('/roles/delete/:id',deleteRole);

export default router;