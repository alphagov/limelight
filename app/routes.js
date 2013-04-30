define([
  'licensing/controllers/overview',
  'extensions/views/view',
  'tpl!common/templates/base.html',
  'tpl!common/templates/404.html',
  'tpl!common/templates/500.html'
],
function (overviewController, View, templateBase, template404, template500) {
  
  var environment = process.env.NODE_ENV || 'development';
  
  var processRequest = function (controller, req, res) {
    var timeout = setTimeout(function() {
      processRequest(create500, req, res);
    }, 5000);
    
    var view = controller(req, res);
    if (!view) {
      return;
    }
    
    view.on('postrender', function () {
      clearTimeout(timeout);
      res.send(templateBase({
        title: view.title,
        cssPath: '/limelight/css/',
        content: view.$el.html(),
        controller: overviewController.path,
        requireBaseUrl: global.requireBaseUrl,
        backdropUrl: global.backdropUrl,
        environment: environment
      }));
    });
    
    view.render();
  };
  
  var create404 = function (req, res) {
    res.status(404);
    return new View({
      title: 'Page not found - 404',
      template: template404
    });
  };
  
  var create500 = function (req, res) {
    res.status(500);
    return new View({
      title: 'Page could not be loaded - 500',
      template: template500
    });
  };
  
  return function (app) {
    app.get('/performance/licensing', function (req, res) {
      processRequest(overviewController, req, res);
    });

    app.use(function(req, res, next){
      processRequest(create404, req, res);
    });
  };
});
