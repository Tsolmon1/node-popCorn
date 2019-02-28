var express     = require("express"),
    app         = express(),
    moment      = require('moment'),
    request     = require("request"),
    bodyParser  = require("body-parser")
    compression = require('compression'),
    minifyHTML  = require('express-minify-html');

    app.set("view engine","ejs");
    app.use(express.static(__dirname + "/public"));
    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({ extended: true }));

    // compress all responses
    app.use(compression())

    // express-minify-html
    app.use(minifyHTML({
      override:      true,
      exception_url: false,
      htmlMinifier: {
          removeComments:            true,
          collapseWhitespace:        true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes:     true,
          removeEmptyAttributes:     true,
          minifyJS:                  true
      }
  }));

    //requiring routes
    var indexRoutes     = require("./routes/index"),
        moviesRoutes    = require("./routes/nowplaying"),
        popularRoutes   = require("./routes/popular"),
        topratedRoutes  = require("./routes/toprated"),
        upcomingRoutes  = require("./routes/upcoming");

    app.use("/", indexRoutes);
    app.use("/nowplaying", moviesRoutes);
    app.use("/popular", popularRoutes);
    app.use("/toprated", topratedRoutes);
    app.use("/upcoming", upcomingRoutes);

    app.listen(process.env.PORT || 8080,function(){
      console.log("The Popcorn App server has started on port 8080!");
});
