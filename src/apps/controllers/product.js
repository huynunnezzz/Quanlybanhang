const productModel = require('../models/product');
const categoryModel = require('../models/category');
const pagnigation = require('../../common/pagnigation');
const slug = require('slug');
const fs = require('fs');
const path = require('path');



const getProduct = async (req,res)=>{

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = page*limit - limit;
    const totalRow = await productModel.find().countDocuments();
    const totalPage = Math.ceil(totalRow/limit);
    const prev = page - 1;
    const hasPrev = (page>1) ? true : false;
    const next = page + 1;
    const hasNext = (page<totalPage) ? true : false;

    const products = await productModel
        .find()
        .populate({path:"cat_id"})
        .sort({_id: -1})
        .skip(skip)
        .limit(limit);
    res.render("admin/products/product",{
        products,
        pages:pagnigation(page,totalPage),
        next,
        hasNext,
        prev,
        hasPrev
    });
}

const createProduct = async (req,res) => {
    const categories = await categoryModel.find();
    res.render("admin/products/add_product",{categories});
}

const store = async (req,res) => {
    const {file,body} = req;
    const product = {
        name : body.name,
        slug : slug(body.name,'-'),
        price : body.price,
        warranty : body.warranty,
        accessories : body.accessories,
        promotion : body.promotion,
        status : body.status,
        cat_id : body.cat_id,
        is_stock : body.is_stock==1?true:false,
        featured : body.featured==1?true:false,
        description : body.description
    }
    if(file){
        const thumbnail = "products/" + file.originalname;
        fs.renameSync(file.path,path.resolve("src/public/images",thumbnail));
        product["thumbnail"] = thumbnail;
        new productModel(product).save();
        res.redirect("/admin/products");
    }

}
const editProduct = async (req,res)=>{
    const id = req.params.id;
    const editproduct = await productModel.findById(id);
    const categories = await categoryModel.find();
    res.render('admin/products/edit_product',{editproduct,categories});
}
const updateProduct = async (req,res) => {
    const {file,body} = req;
    const id = req.params.id;
    const product = {
        name : body.name,
        slug : slug(body.name),
        price : body.price,
        warranty : body.warranty,
        accessories : body.accessories,
        promotion : body.promotion,
        status : body.status,
        cat_id : body.cat_id,
        is_stock : body.is_stock==1?true:false,
        featured : body.featured==1?true:false,
        description : body.description
    }
    if(file){
        const thumbnail = "products/" + file.originalname;
        fs.renameSync(file.path,path.resolve("src/public/images",thumbnail));
        product["thumbnail"] = thumbnail;
    }
    await productModel.findByIdAndUpdate(id,product).exec();
    res.redirect("/admin/products");
}
const delProduct = async (req,res)=>{
    const id = req.params.id;
    await productModel.findByIdAndDelete(id).exec();
    res.redirect('/admin/products');
}


module.exports = {
    getProduct,
    createProduct,
    store,
    editProduct,
    updateProduct,
    delProduct,
}