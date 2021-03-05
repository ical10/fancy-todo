'use strict';
const {
    Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Todo.belongsTo(models.User)
        }
    };
    Todo.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a title'
                },
                notEmpty: {
                    args: true,
                    msg: "Title must be filled!"
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a description'
                },
                notEmpty: {
                    args: true,
                    msg: "Description must be filled!"
                }
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please set a status'
                },
                notEmpty: {
                    args: true,
                    msg: "Status must be filled!"
                },
                booleanChecker(value) {
                    if (typeof value !== "boolean") {
                        throw new Error("Status must be either true or false!")
                    }
                }
            }
        },
        due_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: false, // kenapa defaultValue gak ke-trigger?
            validate: {
                notNull: {
                    msg: 'Please enter a due date'
                },
                notEmpty: {
                    args: true,
                    msg: "Due Date must be filled!"
                },
                dateValidator(value) {
                    let valueDate = new Date(value)
                    valueDate.setHours(0, 0, 0, 0)
                    let today = new Date()
                    today.setHours(0, 0, 0, 0)
                    if (valueDate < today) {
                        throw new Error("date must be greater than today!")
                    }
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Todo',
    });
    return Todo;
};
