module.exports = function(sequelize,dataTypes){
    let alias = "Productos";

    let columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true
        },
        nombre:{
            type:dataTypes.STRING,
            allowNull: false
        },
        descripcion:{
            type: dataTypes.STRING,
            allowNull: false
        },
        image:{
            type: dataTypes.STRING,
            allowNull: false
        },
        id_cliente: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }

    let config = {
        tableName: "productos",
        timestamps: false  
    }

const Productos = sequelize.define(alias, columnas,config)

Productos.associate = function(models){
    Productos.belongsTo(models.Clientes, {
        as:"clientes",
        foreignKey: "id_cliente"
    })
    
    Productos.hasMany(models.Comentarios, {
        as:"comentarios",
        foreignKey: "id_producto"
    })
}

    return Productos
}