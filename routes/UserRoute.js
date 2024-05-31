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
router.get('/profile/:id',verifyToken, getUserById);
router.put('/profile/update/:id',verifyToken, updateUser);
router.delete('/profile/delete/:id',verifyToken, deleteUser);
router.delete('/logout', logout);

//endpoint tabel show
router.get('/show',verifyToken, getShow);
router.post('/show/create',verifyToken, createShow);
router.get('/show/:id',verifyToken, getShowById);
router.put('/show/update/:id',verifyToken, updateShow);
router.delete('/show/delete/:id',verifyToken, deleteShow);

//endpoint tabel form_pembelian
router.get('/formbeli/:id_user',verifyToken, getFormPembelian);
router.post('/formbeli/create',verifyToken, createFormPembelian);
router.get('/formbeli/detail/:id',verifyToken, getFormPembelianById);
router.put('/formbeli/update/:id',verifyToken, updateFormPembelian);
router.delete('/formbeli/delete/:id',verifyToken, deleteFormPembelian);




export default router;