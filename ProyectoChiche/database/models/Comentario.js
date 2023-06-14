module.exports = function(sequelize,dataTypes){
    let alias = "Comentarios"

let cols = {
    id:{
        primaryKey: true,
        type: dataTypes.INTEGER
    },
    comentario:{
        primareyKey: true,
        type: dataTypes.STRING
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