// const productModel = require('../models/productModel');
// const ProductModel = require('../models/productModel');

// //Get products Api-/api/v1/products
// exports.getproducts = async (req, res, next) => {
//     const query = req.query.keyword?{ name : {
//         $regex: req.query.keyword,
//         $options: 'i'
//     }}:{}
//     const products = await ProductModel.find({query});



//     res.json({
//         success: true,
//         products,
//     })

// }

// //Get Single products- api/v1/product/:id
// exports.getSingleProduct = async (req, res, next) => {
//     try {
//         const product = await ProductModel.findById(req.params.id);
//         res.json({
//             success: true,
//             product,

//         })

//     } catch (error) {
//         res.status().json({
//             success: false,
//             message: 'unable to get product with that ID'

//         })

//     }







// }


const ProductModel = require('../models/productModel');

// Get products API - /api/v1/products
exports.getproducts = async (req, res, next) => {
    const query = req.query.keyword ? { 
        name: { $regex: req.query.keyword, $options: 'i' } 
    } : {};

    try {
        const products = await ProductModel.find(query);

        res.json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
        });
    }
};

// Get single product - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to get product with that ID',
        });
    }
};





