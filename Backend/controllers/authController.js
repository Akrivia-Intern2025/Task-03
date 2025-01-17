const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { signupValidation } = require('../validations/userValidation');
const dotenv = require('dotenv');
const sharp = require('sharp');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const vendorModel = require('../models/vendorModel');
const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');
const knex = require('../mysql/connection');
const productToVendorModel = require('../models/productToVendor');



dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = {
  async signup(req, res, next) {
    try {
      const { error } = signupValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const { first_name, last_name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const username = `${last_name}${Date.now()}`;

      await userModel.createUser({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        username,
      });

      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    console.log("******");
    try {
      console.log(req.body, 'req.body');
      const { email, password } = req.body;
      const user = await userModel.findByEmail(email);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log('isValidPassword:', isValidPassword);
      if (!isValidPassword) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, user });
    } catch (err) {
      next(err);
    }
  },

  async getUserDetails(req, res, next) {
    try {
      const user = await userModel.findEmail(req.user.email); // Fetch user by email from token
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return only the required fields
      res.status(200).json({
        username: user.username,
        email: user.email,
        profile_pic: user.profile_pic || null,
      });
    } catch (err) {
      next(err);
    }
  },

  async uploadProfilePhoto(req, res, next) {
    try {
      const file = req.file;  // Get file from request

      // Process the image with Sharp (resize and format it)
      const processedImage = await sharp(file.buffer)
        .resize(200, 200)  // Resize to 200x200 or whatever size you need
        .toBuffer();

      // Upload image to AWS S3
      const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `eeshwar/profile_photos/${Date.now()}_${file.originalname}`, // File name in S3
        Body: processedImage,
        ContentType: file.mimetype,  // This makes the image publicly accessible
      };

      const command = new PutObjectCommand(s3Params);
      const s3Response = await s3.send(command);

      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Params.Key}`;

      // Update user's profile pic URL in the database
      await userModel.updateProfilePic(req.user.email, fileUrl);

      res.status(200).json({ message: 'Profile picture updated successfully!', url: fileUrl });
    } catch (err) {
      next(err);
    }
  },
  async getVendorCount(req, res) {
    try {
      const count = await knex('vendors').count('vendor_id as count').first();
      res.json({ count: count.count });
    } catch (error) {
      console.error('Error fetching vendor count:', error);
      res.status(500).json({ message: 'Error fetching vendor count' });
    }
  },



  async getVendorCount(req, res) {
    try {
      const count = await knex('vendors').count('vendor_id as count').first();
      res.json({ count: count.count });
    } catch (error) {
      console.error('Error fetching vendor count:', error);
      res.status(500).json({ message: 'Error fetching vendor count' });
    }
  },


  async getProducts(req, res) {
    try {
      console.log('req.query:', req.query);
      let { page = 1, limit = 10 } = req.query;

      page = parseInt(page); // Ensure page is an integer
      limit = parseInt(limit); // Ensure limit is an integer
      const offset = (page - 1) * limit;

      console.log('page:', page);
      console.log('limit:', limit);
      console.log('offset:', offset);

      // Get all records with necessary joins
      const allProducts = await knex('products')
        .join('categories', 'products.category_id', '=', 'categories.category_id')
        .leftJoin('product_to_vendor', 'products.product_id', '=', 'product_to_vendor.product_id')
        .leftJoin('vendors', 'product_to_vendor.vendor_id', '=', 'vendors.vendor_id')
        .select('products.*', 'categories.category_name', 'vendors.vendor_name')
        .where('products.status', 1); 

      // Group vendors by product
      const groupedProducts = allProducts.reduce((acc, product) => {
        const { product_id, vendor_name, ...productData } = product;

        if (!acc[product_id]) {
          acc[product_id] = { ...product, vendors: [] };
        }

        if (vendor_name) {
          acc[product_id].vendors.push(vendor_name);
        }

        return acc;
      }, {});

      // Convert the grouped products back to an array
      const productList = Object.values(groupedProducts);

      // Pagination in-memory
      const totalItems = productList.length;
      const paginatedProducts = productList.slice(offset, offset + limit);

      console.log('products array:', paginatedProducts);

      // Send the paginated products and total count back
      res.json({
        products: paginatedProducts,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  },

  async addProduct(req, res, next) {
    try {
      const { productName, category, vendor, quantity, unitPrice, unit, status } = req.body;
      let productImage = null;

      if (req.file) {
        // Process the image with Sharp (resize and format it)
        const processedImage = await sharp(req.file.buffer)
          .resize(50, 50)  // Resize to 50x50
          .toBuffer();

        // Upload image to AWS S3
        const s3Params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `eeshwar/product_images/${Date.now()}_${req.file.originalname}`, // File name in S3
          Body: processedImage,
          ContentType: req.file.mimetype,  // This makes the image publicly accessible
        };
        const command = new PutObjectCommand(s3Params);
        const s3Response = await s3.send(command);

        productImage = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Params.Key}`;
      }

      // Create product data
      const productData = {
        product_name: productName,
        category_id: category,
        quantity_in_stock: quantity,
        unit_price: unitPrice,
        product_image: productImage,
        status: status,
        unit: unit,
      };
      // Insert product data into the database
      const [productId] = await productModel.createProduct(productData);

      // Create product-to-vendor mapping
      const productToVendorData = {
        product_id: productId,
        vendor_id: vendor,
        status: 1, // Assuming status is 1 for active
      };

      await productModel.createProductToVendor(productToVendorData);

      res.status(201).json({ message: 'Product added successfully', product: { ...productData, product_id: productId } });
    } catch (err) {
      next(err);
    }
  },
  async getCategories(req, res, next) {
    try {
      const categories = await categoryModel.getAllCategories();
      res.status(200).json({ categories });
    } catch (err) {
      next(err);
    }
  },
  async getVendors(req, res, next) {
    try {
      const vendors = await vendorModel.getAllVendors();
      res.status(200).json({ vendors });
    } catch (err) {
      next(err);
    }
  },
   
  async uploadProductImage(req, res, next) {
    try {
      const { productId } = req.body; // Get product ID from request body
      const file = req.file;  // Get file from request

      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }

      // Process the image with Sharp (resize and format it)
      const processedImage = await sharp(file.buffer)
        .resize(50, 50)  // Resize to 50x50
        .toBuffer();

      // Upload image to AWS S3
      const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `eeshwar/product_images/${Date.now()}_${file.originalname}`, // File name in S3
        Body: processedImage,
        ContentType: file.mimetype,  // This makes the image publicly accessible
      };

      const command = new PutObjectCommand(s3Params);
      const s3Response = await s3.send(command);

      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Params.Key}`;

      // Update product image URL in the database
      await productModel.updateProduct(productId, { product_image: fileUrl });

      res.status(200).json({ message: 'Product image uploaded and updated successfully!', url: fileUrl });
    } catch (err) {
      console.error('Error uploading product image:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


// Update product method
async updateProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const productData = req.body;
    console.log(productData, 'productData');

    const productObj = JSON.parse(JSON.stringify(productData))
    delete productObj.vendor_id
    console.log(productObj)
    // Start a transaction
    await knex.transaction(async (trx) => {
      // Update product data in the products table
      await trx('products').where('product_id', productId).update(productObj);

      // Handle image upload if a file is provided
      if (req.file) {
        const file = req.file;

        // Process the image with Sharp (resize and format it)
        const processedImage = await sharp(file.buffer)
          .resize(50, 50)  // Resize to 50x50
          .toBuffer();

        // Upload image to AWS S3
        const s3Params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `eeshwar/product_images/${Date.now()}_${file.originalname}`, // File name in S3
          Body: processedImage,
          ContentType: file.mimetype,  // This makes the image publicly accessible
        };

        const command = new PutObjectCommand(s3Params);
        await s3.send(command);

        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Params.Key}`;

        // Update product image URL in the database
        await trx('products').where('product_id', productId).update({ product_image: fileUrl });
      }

      // Update product-to-vendor mapping if vendor_id has changed
      if (productData.vendor_id) {
        const productToVendorData = {
          product_id: productData.product_id,
          vendor_id: productData.vendor_id,
          status: 1, // Assuming status is 1 for active
        };

         const existing = await trx('product_to_vendor')
          .where('product_id', productData.product_id)
          .andWhere('vendor_id', productData.vendor_id)
          .first();

          if (existing) {
            // If the relationship already exists, update the status and timestamps
            await trx('product_to_vendor')
              .where('id', existing.id) // Use the primary key to locate the record
              .update({
                status: 1, // Set the status to active
                updated_at: trx.fn.now(), // Update the timestamp
              });
          } else {
            // If it's a new vendor for the product, insert a new row
            await trx('product_to_vendor').insert(productToVendorData);
          }


        // await trx('product_to_vendor').insert(productToVendorData);
        
        // await trx('product_to_vendor').where('product_id', productId).update(productToVendorData);
        // await trx('product_to_vendor').insert(productToVendorData);
        // await trx('product_to_vendor')
        // .insert(productToVendorData)
        // .onConflict(['product_id', 'vendor_id']) // Specify the unique key(s)
        // .merge();
        // Update vendor_id in the products table
        // await trx('products').where('product_id', productId).update({ vendor_id: productData.vendor_id });
       
      }

      // Update category if necessary
      if (productData.category_id) {
        await trx('categories')
          .where('category_id', productData.category_id)
          .update({ status: 1 }); // Assuming `status: 1` means active

        // Update category_id in the products table
        await trx('products').where('product_id', productId).update({ category_id: productData.category_id });
      }

      // Update vendors if vendor data is passed
      if (productData.vendor_id) {
        const vendorData = {
          vendor_name: productData.vendor_name, // Assuming this field exists
          status: 1, // Example of updating vendor status
        };
        await trx('vendors').where('vendor_id', productData.vendor_id).update(vendorData);
      }
    });

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
  ,



// Controller to soft delete product
  async deleteProduct(req, res, next) {
    // console.log("******")
    const { productId } = req.params; // Get the product ID from request parameters
    console.log(productId, 'productId');

  try {
    // Start a transaction for atomic updates
    await knex.transaction(async (trx) => {
      // Update status in `products` table
      await trx('products')
        .where('product_id', productId)
        .update({ status: 99 });

      // Update status in `product_to_vendor` table
      await trx('product_to_vendor')
        .where('product_id', productId)
        .update({ status: 99 });
    });

    // Send success response
    return res
      .status(200)
      .json({ message: 'Product and related vendors deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res
      .status(500)
      .json({ message: 'Failed to delete product', error: error.message });
  }
},


};