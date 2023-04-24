const Product = require('../models/ProductsModel');

// Создание нового продукта
exports.createProducts = async (req, res, next) => { //+
  const { name, model, price, quantity, image, description, categoryId } = req.body;
  console.log(req.body);
  try {
    await Product.createProduct(name, model, price, quantity, image, description, categoryId);
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (err) {
    next(err);
  }
};

// Создание новоЙ категории
exports.createCategories = async (req, res, next) => { //+
  const { name, description } = req.body;
  try {
    await Product.createCategory(name, description);
    res.status(201).json({ message: 'Category created successfully!' });
  } catch (err) {
    next(err);
  }
};

// Получение информации о продукте
exports.getOneProduct = async (req, res, next) => {
  const { value } = req.body;
  try {
    const product = await Product.getProduct(value);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

// Получение списка всех продуктов
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

// Получение списка категорий
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Product.getAllCategories();
    res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};

// Обновление продукта по id
exports.updateProduct = async (req, res, next) => {
  const { id, name, model, price, quantity, image, description, categoryId } = req.body;
  console.log(id, name, price, quantity, image, description, categoryId);
  try {
    await Product.updateProduct(id, name, model, price, quantity, image, description, categoryId);
    res.status(200).json({ message: 'Product updated successfully'});
  } catch (err) {
    next(err);
  }
};

// Удаление продукта по id
exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.deleteProductById(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Удаление категории по id
exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.deleteCategoryById(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
};