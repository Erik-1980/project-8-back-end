const { Products } = require('./db');
const { Categories } = require('./db');

const createProduct = async (name, model, price, quantity, image, description, categoryId) => { //+
  try {
    const newProduct = await Products.create({ name, model, price, quantity, image, description, categoryId });
    return newProduct;
  } catch (error) {
    throw new Error(`Failed to create product: ${error.message}`);
  }
};

const createCategory = async (name, description) => { //+
  try {
    const newProduct = await Categories.create({ name,  description });
    return newProduct;
  } catch (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
};


const getAllProducts = async () => {
  try {
    const products = await Products.findAll({
      include: [
        {
          model: Categories,
          attributes: ['name']
        }
      ],
      raw: true
    });
    return products;
  } catch (error) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Categories.findAll();
    return categories;
  } catch (error) {
    throw new Error(`Failed to get all categories: ${error.message}`);
  }
};

const getProduct = async (value) => {
  try {
    const product = isNaN(value) ?
    await Products.findOne({
      include: [
        {
          model: Categories,
          attributes: ['name'],
        }
      ],
      where: {
        name: value 
      },
      raw: true
    }) : 
    await Products.findOne({
      include: [
        {
          model: Categories,
          attributes: ['name']
        }
      ],
      where: {
        id: value 
      },
      raw: true
    })
    return product;
  } catch (error) {
    throw new Error(`Failed to get product: ${error.message}`);
  }
};

const updateProduct = async (id, name, model, price, quantity, image, description, categoryId) => {
  try {
    const updatedProduct = await Products.update(
      { name, model, price, quantity, image, description, categoryId },
      { where: { id } }
    );
    return updatedProduct;
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
};

const deleteProductById = async (id) => {
  try {
    const deletedProduct = await Products.destroy({ where: { id } });
    return deletedProduct;
  } catch (error) {
    throw new Error(`Failed to delete product by id: ${error.message}`);
  }
};

const deleteCategoryById = async (id) => {
  try {
    const deletedCategory = await Categories.destroy({ where: { id } });
    return deletedCategory;
  } catch (error) {
    throw new Error(`Failed to delete category by id: ${error.message}`);
  }
};

module.exports = {
  createProduct,
  createCategory,
  getAllProducts,
  getProduct,
  getAllCategories,
  updateProduct,
  deleteProductById,
  deleteCategoryById
};
