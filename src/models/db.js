const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'Mydatabase', 'database.db')
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(() => {
        const error = new Error('Failed to connect to the database');
        error.status = 500;
        throw error;
    });

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adress: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    verification: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
});

const Products = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false 
    }
});

const Categories = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

const Orders = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

const Carts = sequelize.define('carts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Users.hasOne(Carts);
Carts.belongsTo(Users);
Categories.hasMany(Products);
Products.belongsTo(Categories);
Users.hasMany(Orders);
Orders.belongsTo(Users);

sequelize.sync()
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = {
    sequelize,
    Users,
    Products,
    Categories,
    Orders,
    Carts
};