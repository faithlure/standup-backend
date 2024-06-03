import express from "express";
import {
    getUserById,
    Register,
    updateUser,
    deleteUser,
    loginhandler,
    initialEnpoint,
    logout
} from "../controller/UserController.js";

import {
    getShow,
    getShowById,
    createShow,
    updateShow,
    deleteShow
} from "../controller/ShowController.js";

import {
   getFormPembelian,
   updateFormPembelian,
   createFormPembelian,
   deleteFormPembelian,
   getFormPembelianById
} from "../controller/FormPembelianController.js";
import {verifyToken} from "../middleware/VerifyToken.js"
import { authToken } from "../controller/authToken.js";

const router = express.Router();

router.get('/', initialEnpoint);


//endpoint akses token
router.get('/token', authToken);
//endpoint table user
router.post('/login', loginhandler);
router.post('/register', Register);
router.get('/profile/:id', getUserById);
router.put('/profile/update/:id', updateUser);
router.delete('/profile/delete/:id', deleteUser);
router.delete('/logout', logout);

//endpoint tabel show
router.get('/show', getShow);
router.post('/show/create', createShow);
router.get('/show/:id', getShowById);
router.put('/show/update/:id', updateShow);
router.delete('/show/delete/:id', deleteShow);

//endpoint tabel form_pembelian
router.get('/formbeli/:id_user', getFormPembelian);
router.post('/formbeli/create', createFormPembelian);
router.get('/formbeli/detail/:id', getFormPembelianById);
router.put('/formbeli/update/:id', updateFormPembelian);
router.delete('/formbeli/delete/:id', deleteFormPembelian);




export default router;