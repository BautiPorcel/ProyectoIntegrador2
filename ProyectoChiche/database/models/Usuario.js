module.exports = function(sequelize,DataTypes){
    let alias = "Usuarios"

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

const Usuarios = sequelize.define(alias, cols, config)

Usuarios.associate = function(models){
        Usuarios.hasMany(models.Producto,{
        as:"productos",
        foreingKey: "id_cliente"
        })

        
}
    return Usuarios
}