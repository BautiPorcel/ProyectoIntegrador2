module.exports = function(sequelize,DataTypes){
    let alias = "Clientes"

let cols = {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name:{
        allowNull: false,
        type: DataTypes.STRING
    },
    password:{
        allowNull: false,
        type:DataTypes.STRING
    },
    email:{
        allowNull: false,
        type:DataTypes.STRING
    }
}

let config = {
    tableName:"clientes",
    timestapms: false
}

const Clientes = sequelize.define(alias, cols, config)

Clientes.associate = function(models){
        Clientes.hasMany(models.Productos,{
        as:"productos",
        foreignKey: "id_cliente"
        })

        
}
    return Clientes
}