module.exports = function(sequelize,DataTypes){
    let alias = "Comentarios"

let cols = {
    id:{
        primareyKey: true,
        type: DataTypes.INTEGER
    },
    comentario:{
        primareyKey: true,
        type: DataTypes.STRING
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

}
return Comentarios
}