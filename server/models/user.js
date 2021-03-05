'use strict';
const { hashPassword } = require('../helpers/bcrypt')

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Todo)
        }
    };
    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Email address already in use!"
            },
            validate: {
                notEmpty: {
                    msg: 'Please enter your email'
                },
                isEmail: {
                    args: true,
                    msg: "Must be a valid email address",
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please enter your password'
                },
                len: {
                    args: [12, 24],
                    msg: "password at least 12 characters and maximum 24 characters"
                }
            }
        }
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                user.password = hashPassword(user.password)
            }
        },
        sequelize,
        modelName: 'User',
    });
    return User;
};
