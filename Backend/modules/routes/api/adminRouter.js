const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdmin = require('./middleware/apiAuthAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
//admin controller
const AuthController = require(`${ControllerApi}/v1/admin/AuthController`);
const AdminUploadController = require(`${ControllerApi}/v1/admin/UploadController`);
const UserController = require(`${ControllerApi}/v1/admin/UserController`);
const UnitController = require(`${ControllerApi}/v1/admin/UnitController`);
const PaidLoanController = require(`${ControllerApi}/v1/admin/PaidLoanController`);

//upload
adminRouter.post('/upload', uploadImage.single('file'), AdminUploadController.uploadImage.bind(AdminUploadController));
//multi file
adminRouter.post('/multiUpload', uploadFiles, AdminUploadController.uploadFiles.bind(AdminUploadController));

//delete file uploaded in server
adminRouter.post('/deleteFile', AdminUploadController.deleteFile.bind(AdminUploadController));

//auth admin
adminRouter.post('/loginAdmin', AuthController.loginAdmin.bind(AuthController));
adminRouter.post('/registerAdmin', apiAuthAdmin, AuthController.registerAdmin.bind(AuthController));
adminRouter.put('/updateAdmin/:id', apiAuthAdmin, AuthController.updateAdmin.bind(AuthController));
adminRouter.delete('/deleteAdmin/:id', apiAuthAdmin, AuthController.deleteAdmin.bind(AuthController));
adminRouter.get('/getAllAdmin', apiAuthAdmin, AuthController.getAllAdmin.bind(AuthController));
adminRouter.get('/getAdmin/:id', apiAuthAdmin, AuthController.getAdmin.bind(AuthController));
adminRouter.put('/changePassword/:id', apiAuthAdmin, AuthController.changePassword.bind(AuthController));
adminRouter.put('/changeUsername/:id', apiAuthAdmin, AuthController.changeUsername.bind(AuthController));
adminRouter.put('/resetPassword', apiAuthAdmin, AuthController.resetPassword.bind(AuthController));
//token
adminRouter.post('/getToken/:id', AuthController.getToken.bind(AuthController));

//user
adminRouter.post('/registerUser', apiAuthAdmin, UserController.registerUser.bind(UserController));
adminRouter.put('/updateUser/:id', apiAuthAdmin, UserController.updateUser.bind(UserController));
adminRouter.delete('/deleteUser/:id', apiAuthAdmin, UserController.deleteUser.bind(UserController));
adminRouter.get('/getUser/:id', apiAuthAdmin, UserController.getUser.bind(UserController));
adminRouter.get('/getAllUser', apiAuthAdmin, UserController.getAllUser.bind(UserController));

//unit
adminRouter.post('/registerUnit', apiAuthAdmin, UnitController.registerUnit.bind(UnitController));
adminRouter.get('/getAllUnit', apiAuthAdmin, UnitController.getAllUnit.bind(UnitController));
adminRouter.get('/getUnit/:id', apiAuthAdmin, UnitController.getUnit.bind(UnitController));
adminRouter.put('/updateUnit/:id', apiAuthAdmin, UnitController.updateUnit.bind(UnitController));
adminRouter.delete('/deleteUnit/:id', apiAuthAdmin, UnitController.deleteUnit.bind(UnitController));
adminRouter.post('/advanceSearchUnit', apiAuthAdmin, UnitController.advanceSearchUnit.bind(UnitController));

//PaidLoan
adminRouter.post('/registerPaidLoan', apiAuthAdmin, PaidLoanController.registerPaidLoan.bind(PaidLoanController));
adminRouter.get('/getAllPaidLoan', apiAuthAdmin, PaidLoanController.getAllPaidLoan.bind(PaidLoanController));
adminRouter.get('/getPaidLoan/:id', apiAuthAdmin, PaidLoanController.getPaidLoan.bind(PaidLoanController));
adminRouter.put('/updatePaidLoan/:id', apiAuthAdmin, PaidLoanController.updatePaidLoan.bind(PaidLoanController));
adminRouter.delete('/deletePaidLoan/:id', apiAuthAdmin, PaidLoanController.deletePaidLoan.bind(PaidLoanController));

router.use('', adminRouter);
module.exports = router;
