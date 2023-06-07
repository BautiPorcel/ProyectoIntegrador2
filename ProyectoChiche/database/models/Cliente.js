module.exports = function(sequelize,DataTypes){
    let alias = "Clientes"

let cols = {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre:{
        allowNull: false,
        type: DataTypes.STRING
    },
    contrasena:{
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
    timestamps: false
}

const Clientes = sequelize.define(alias, cols, config)

Clientes.associate = function(models){
        Clientes.hasMany(models.Productos,{
        as:"productos",
        foreignKey: "id_cliente"
        })
        Clientes.hasMany(models.Comentarios,{
            as:"comentarios",
            foreignKey: "id_cliente"
            })
        
}
    return Clientes
}