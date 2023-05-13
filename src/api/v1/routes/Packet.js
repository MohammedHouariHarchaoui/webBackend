import  express  from "express";
import {
    getPacks,
    getPackById,
    createPack,
    updatePack,
    deletePack
} from '../services/Packet.js'
const router = express.Router();

router.get('/packs',getPacks);
router.get('/packs/:id',getPackById);
router.post('/packs/add',createPack);
router.patch('/packs/edit/:id',updatePack);
router.delete('/packs/delete/:id',deletePack);

export default router;