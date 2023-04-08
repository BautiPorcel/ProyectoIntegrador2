const data = require('../data/data')
const controller = {
    home: function(req, res, next) {
        res.render('index', { title: 'Express' }, {
          productos: data.productos
        });
      },
    
}