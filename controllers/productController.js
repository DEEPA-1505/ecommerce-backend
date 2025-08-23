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
const fs = require('fs').promises;
const path = require('path');

// Get products API - /api/v1/products
exports.getproducts = async (req, res, next) => {
    const query = req.query.keyword ? req.query.keyword.toLowerCase() : '';

    try {
        // Read products from JSON file
        const productsPath = path.join(__dirname, '../data/products.json');
        const productsData = await fs.readFile(productsPath, 'utf8');
        let products = JSON.parse(productsData);

        // Filter products by keyword if search query exists
        if (query) {
            products = products.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
        }

        res.json({
            success: true,
            products,
        });
    } catch (error) {
        console.error('Error reading products:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch products',
        });
    }
};

// Get single product - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try {
        // Read products from JSON file
        const productsPath = path.join(__dirname, '../data/products.json');
        const productsData = await fs.readFile(productsPath, 'utf8');
        const products = JSON.parse(productsData);

        // Find product by index (since JSON doesn't have MongoDB IDs)
        const productIndex = parseInt(req.params.id);
        const product = products[productIndex];

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Add a mock ID for consistency
        product._id = productIndex.toString();

        res.json({
            success: true,
            product,
        });
    } catch (error) {
        console.error('Error reading product:', error);
        res.status(500).json({
            success: false,
            message: 'Unable to get product with that ID',
        });
    }
};





