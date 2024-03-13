const userModel = require('../models/user');
const adminModel = require('../models/admin');
const pagnigation = require('../../common/pagnigation');
const fs = require('fs');
const path = require('path');
const getUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = page * limit - limit;
    const totalRow = await userModel.find().countDocuments();
    const totalPage = Math.ceil(totalRow / limit);
    const prev = page - 1;
    const hasPrev = (page > 1) ? true : false;
    const next = page + 1;
    const hasNext = (page < totalPage) ? true : false;
    const users = await userModel
        .find()
        .populate({ path: "cat_id" })
        .limit(limit)
        .skip(skip);
    res.render('admin/users/user', {
        users,
        pages: pagnigation(page, totalPage),
        next,
        hasNext,
        prev,
        hasPrev
    });
}

const getcreateUser = async (req, res) => {
    const admin = await adminModel.find();
    res.render('admin/users/add_user', { data: { admin } });
}
const postcreateUser = async (req, res) => {
    checkadd = false;
    const admin = await adminModel.find();
    const { account, password, repassword, role, fullName, sex, address, phoneNumber, cat_id } = req.body;
    const { file } = req;
    const checkuser = await userModel.find({
        account: account
    })
    let error = null;
    let success = null;
    if (account == "" || password == "" || role == "" || fullName == "" || address == "" || phoneNumber == "") {
        error = "Yêu cầu nhập đầy đủ thông tin!";
    }
    else if (checkuser.length > 0) {
        error = "Tài khoản đã được đăng ký";
    }
    else if (password != repassword) {
        error = "Mật khẩu không trùng khớp";
    }
    else {
        const user = {
            account: account,
            password: password,
            fullName: fullName,
            sex: sex,
            address: address,
            phoneNumber: phoneNumber,
            role: role,
            cat_id: cat_id
        }
        if (file) {
            const thumbnail = "users/" + file.originalname;
            fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
            user["thumbnail"] = thumbnail;
        }

        await new userModel(user).save();
        checkadd = true;
        success = "Đăng ký thành công";
    }
    res.render("admin/users/add_user", { data: { error, success, checkadd, admin } });
}

const geteditUSer = async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    const admin = await adminModel.find();
    res.render('admin/users/edit_user', { data: { user, admin } });
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { account, password, fullName, sex, address, phoneNumber, role, cat_id } = req.body;
    const {file} = req;
    const updateUser = { account, password, role, fullName, sex, address, phoneNumber, role, cat_id };
    if (file) {
        const thumbnail = "users/" + file.originalname;
        fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
        updateUser["thumbnail"] = thumbnail;
    }
    await userModel.findByIdAndUpdate(id, updateUser).exec();
    res.redirect('/admin/users');
}

const delUser = async (req, res) => {
    const id = req.params.id;
    await userModel.findByIdAndDelete(id).exec();
    res.redirect('/admin/users');
}

const updateAvatar = async (req,res) => {
    const id = req.params.id;
    const {file} = req;
    if(file){
        const thumbnail = "users/" + file.originalname;
        fs.renameSync(file.path,path.resolve("src/public/images",thumbnail));
        await userModel.findByIdAndUpdate(id,{$set:{thumbnail:thumbnail}});
        res.redirect('/admin/users')
    }
}
module.exports = {
    getUser,
    getcreateUser,
    postcreateUser,
    geteditUSer,
    updateUser,
    delUser,
    updateAvatar
}