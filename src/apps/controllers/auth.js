const adminModel = require('../models/admin');

const getLogin = (req, res) => {
    res.render("admin/login", { data: {} });
}
const postLogin = async (req, res) => {
    const { account, password } = req.body;
    let error = null;
    const admin = await adminModel.find({
        account: account,
        password: password
    })
    if (account == "" || password == "") {
        error = "Yêu cầu nhập đầy đủ thông tin!"
    }
    else if (admin.length > 0) {
        req.session.account = account;
        req.session.password = password;
        res.redirect("/admin/dashboard");
    } else {
        error = "Tài khoản không hợp lệ";
    }
    const adminlogin = await adminModel.find();
    res.render("admin/login", { data: { error ,adminlogin} });
}


const getRegester = (req, res) => {
    res.render("admin/regester", { data: {} });
}

const postRegester = async (req, res) => {
    checkadd = false;
    const { account, password, repassword, role, full_name } = req.body;
    const checkemail = await adminModel.find({
        account:account
    })
    let error = null;
    let success = null;
    if (account == "" || password == "" || role == "" || full_name == "") {
        error = "Yêu cầu nhập đầy đủ thông tin!";
    }
    else if(checkemail.length > 0) {
        error = "Email đã được đăng ký";
    }
    else if(password != repassword){
        error = "Mật khẩu không trùng khớp";
    }
    else{
        await new adminModel({
            account: email,
            password: password,
            role: role,
            full_name: full_name
        }).save();
        checkadd = true;
        success = "Đăng ký thành công";
    }
    res.render("admin/regester", { data: { error, success,checkadd}});
}

const getLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
}

module.exports = {
    getLogin,
    postLogin,
    getRegester,
    postRegester,
    getLogout
}