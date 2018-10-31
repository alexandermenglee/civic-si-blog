const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose");
    Blog = require("./models/blog");

//CONNECTION TO MONGODB
mongoose.connect("mongodb://localhost/civicsi_blog", function(err, db){
  if(err){
    console.log(err);
  } else{
    console.log("MongoDB Connection Successful" );
  }
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use("/public", express.static(__dirname + "/public"));

app.get("/blogs", function(req, res){
  res.redirect("/");
})

//HOME ROUTE
app.get("/", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log(err);
    } else{
        res.render("index", {blogs: blogs});
    }
  });
});

// //CREATE ROUTE
app.get("/blogs/new", function(req, res){
  res.render("new");
});

app.post("/blogs", function(req, res){
  Blog.create(req.body.post, function(err, blog){
    if(err){
      console.log(err);
    } else{
        console.log("POST " + blog.Title + " CREATED");
        res.redirect("/blogs");
    }
  });
});

// //SHOW ROUTE
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      console.log(err);
    } else{
      res.render("show", {blog: blog});
    }
  });
});

//
// //UPDATE ROUTE
app.get("/blogs/:id/update", function(req, res){
  Blog.findById(req.params.id, function(err, post){
    if(err){
      console.log(err);
    } else{
      res.render("update", {blog: post});
    }
  });
});

app.put("/blogs/:id", function(req, res){
  let id = req.params.id;
  Blog.findByIdAndUpdate(id, req.body.blog, function(err, blog){
    if(err){
      console.log(err);
    } else{
      res.redirect("/blogs/" + id);
    }
  });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
  var id = req.params.id;
  Blog.findByIdAndRemove(id, function(err, blog){
    if(err){
      console.log(err);
    } else{
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, function(err){
  if(err){
    console.log(err);
  } else{
    console.log("Listening...");
  }
});
