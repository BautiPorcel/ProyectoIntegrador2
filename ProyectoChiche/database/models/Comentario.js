module.exports = function(sequelize,dataTypes){
    let alias = "Comentarios"

let cols = {
    id:{
        primaryKey: true,
        type: dataTypes.INTEGER
    },
    comentario:{
        primaryKey: true,
        type: dataTypes.STRING
    },
    id_cliente:{
        primaryKey: true,
        type: dataTypes.INTEGER
    },
    id_producto:{
        primaryKey: true,
        type: dataTypes.INTEGER
    }
    

}

let config = {
    tableName: "comentarios",
    timestamps: false
}

const Comentarios = sequelize.define(alias,cols,config)

Comentarios.associate = function(models){
    Comentarios.belongsTo(models.Clientes,{
        as:"clientes",
        foreignKey: "id_cliente"
    })

    Comentarios.belongsTo(models.Productos,{
        as:"productos",
        foreignKey: "id_producto"
        })
}

return Comentarios
}