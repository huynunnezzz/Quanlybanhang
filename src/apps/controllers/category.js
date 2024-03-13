const categoryModel = require('../models/category');
const pagnigation = require('../../common/pagnigation');
const slug = require('slug');

const getCategory = async (req,res)=>{
    
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = page * limit - limit;
    const totalRow = await categoryModel.find().countDocuments();
    const totalPage = Math.ceil(totalRow/limit);
    const prev = page - 1;
    const hasPrev = (page>1) ? true : false;
    const next = page + 1;
    const hasNext = (page<totalPage) ? true : false;
    const categories = await categoryModel
                            .find()
                            .skip(skip)
                            .limit(limit);
    res.render("admin/categories/category",{
        categories,
        pages:pagnigation(page,totalPage),
        next,
        hasNext,
        prev,
        hasPrev});
}

const createCategory = async (req,res) => {
    res.render("admin/categories/add_category");
}
const addCategory = async (req,res) => {
    const {body} = req;
    const category = {
        title : body.name,
        slug : slug(body.name),
        description : (body.description)=="" ? "null" : body.description
    }
    new categoryModel(category).save();
    res.redirect("/admin/categories")
}

const editCagory = async (req,res) => {
    const id = req.params.id;
    const editcategory = await categoryModel.findById(id);
    res.render('admin/categories/edit_category',{editcategory});
}

const updateCategory = async (req,res) => {
    const id = req.params.id;
    const {body} = req;
    const category = {
        title : body.name,
        slug : slug(body.name),
        description : (body.description)=="" ? "null" : body.description
    }
    await categoryModel.findByIdAndUpdate(id,category).exec();
    res.redirect('/admin/categories');
}



const delCategory = async (req,res) => {
    const id = req.params.id;
    await categoryModel.findByIdAndDelete(id).exec();
    res.redirect('/admin/categories');
}



module.exports = {
    getCategory,
    createCategory,
    addCategory,
    editCagory,
    updateCategory,
    delCategory
}