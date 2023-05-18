module.exports = function(sequelize,dataTypes){
    let alias = "Productos"
    let columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaaryKey: true
        },
        title:{
            type:dataTypes.STRING
        },
        valoracion:{
            type: dataTypes.DECIMAL
        }
    }

    let config = {
        tableName: "productos",
        timestamps: false
    }

const Productos = sequelize.define(alias, columnas,config)

productos.associate = function(models){
    productos.belongsTo(models.Usuarios, {
        as:"usuarios",
        foreingKey: "id_cliente"
    })
}
    return Productos
}