const controller = {
    home: function(req, res, next) {
        res.render('index.ejs', { title: 'Express' });
      },
    
}