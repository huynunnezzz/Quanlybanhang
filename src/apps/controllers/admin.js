const usersModel = require('../models/user');
const productModel = require('../models/product');
const adminModel = require('../models/admin');
const pagnigation = require('../../common/pagnigation');
const admin = require('../models/admin');
const dashboard = async (req, res) => {
    try {
        const lstUser = await usersModel.find().count();
        const lstProduct = await productModel.find().count();
        res.render("admin/dashboard", { data: { lstUser, lstProduct } });
    } catch (error) {
        console.log(error);
    }
}

const getAdministrator = async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = page*limit - limit;
    const totalRow = await adminModel.find().countDocuments();
    const totalPage = Math.ceil(totalRow/limit);
    const prev = page - 1;
    const hasPrev = (page>1) ? true : false;
    const next = page + 1;
    const hasNext = (page<totalPage) ? true : false;
    const admins = await adminModel
                        .find()
                        .limit(limit)
                        .skip(skip);
    res.render("admin/administrators/administrators",{
        admins,
        pages:pagnigation(page,totalPage),
        next,
        hasNext,
        prev,
        hasPrev
    })
}

const getCreateAdministrators = async (req,res) =>{
    res.render("admin/administrators/add_administrators",{data:{}});
}
const CreateAdministrators = async(req,res) => {
    checkadd = false;
    const { account, password, repassword, role, fullName,sex,address,phoneNumber } = req.body;
    const checkadmin = await adminModel.find({
        account:account
    })
    let error = null;
    let success = null;
    if (account == "" || password == "" || role == "" || fullName == "" || address == "" || phoneNumber == "") {
        error = "Yêu cầu nhập đầy đủ thông tin!";
    }
    else if(checkadmin.length > 0) {
        error = "Tài khoản đã được đăng ký";
    }
    else if(password != repassword){
        error = "Mật khẩu không trùng khớp";
    }
    else{
        await new adminModel({
            account: account,
            password: password,
            fullName: fullName,
            sex:sex,
            address:address,
            phoneNumber:phoneNumber,
            role: role,
        }).save();
        checkadd = true;
        success = "Đăng ký thành công";
    }
    res.render("admin/administrators/add_administrators", { data: { error, success,checkadd}});
}

const getEditAdministrators = async (req,res) => {
    const id = req.params.id;
    const infoAdmin = await adminModel.findById(id);
    res.render('admin/administrators/edit_administrators',{infoAdmin});
}

const updateAdministrators = async (req,res) => {
    const id = req.params.id;
    const {account,password,fullName,sex,address,phoneNumber,role} = req.body;
    const updateAdministrators = {
        account,password,fullName,sex,address,phoneNumber,role
    }
    await admin.findByIdAndUpdate(id,updateAdministrators).exec();
    res.redirect('/admin/administrators');

}

const delAdministrators = async (req,res) => {
    const id = req.params.id;
    await adminModel.findByIdAndDelete(id).exec();
    res.redirect('/admin/administrators');
}

const profileAdmin = async (req,res) => {
    
}
module.exports = {
    dashboard,
    getAdministrator,
    getCreateAdministrators,
    CreateAdministrators,
    getEditAdministrators,
    updateAdministrators,
    delAdministrators,
    profileAdmin
}