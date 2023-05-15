---
title: Restful CRUD with Golang for beginners
desc: So in the previous post we finished a simple Hello World request using Golang and Gin. Today it's time for us to build something more complex - CRUD with Gin!
cover: /assets/posts/restful-crud-with-golang-for-beginners.jpg
date: 2022.06.02
tags:
  - golang
  - web
---

Hey guys, it's Sam Zhang.

So in the previous post we finished a simple Hello World request using Golang and Gin. Today it's time for us to build something more complex - CRUD with Gin!

## Table of Contents

- [Getting started](#getting-started)
- [Installing GORM](#installing-gorm)
- [Defining database models](#defining-database-models)
- [Connecting to database](#connecting-to-database)
- [RESTful APIs](#restful-apis)
  - [Create](#api-create)
  - [Read](#api-read)
  - [Update](#api-update)
  - [Delete](#api-delete)
- [Conclusion](#conclusion)

## Getting started <a name="getting-started"></a>

**This tutorial is made for developers who have some experience in programming but relatively new to Go/Gin. You might want to learn some common programming concepts if you're a total beginner.**

So to start up, you'll need to have the hello world program finished from our last post. Or of course you could clone it from [GitHub](https://github.com/samzhangjy/go-blog/tree/1533c8d1db504b2c7f44c0919cc5f2bc91269d9b) to continue.

Then let's get started!

CRUD stands for **C**reate, **R**ead, **U**pdate and **D**elete. Those are the four basic operations in the database and we will be implementing it into our Go app today.

When dealing with databases, you could just write some plain old SQL commands and execute directly it using the database drivers. But there's a problem with it: SQL injection attack. So using ORMs is normally a better option. We will be using [GORM](https://gorm.io/docs/index.html) throughout this series just because it's popular and easy to get started with.

## Installing GORM <a name="installing-gorm"></a>

As it described in the [docs](https://gorm.io/docs/index.html), simply use `go get gorm.io/gorm` to install it.

However, GORM needs database drivers in order to connect to databases and do operations. I will be using [Postgres](https://www.postgresql.org/) for now and you can use whatever database you wanted.

**Note: Sqlite is not recommended since it doesn't support some complex operations natively. But for now, you can use it since we don't have the need of complex operations and you can migrate to others in the future.**

So let's install the database driver too:

```bash
$ go get -u gorm.io/driver/postgres  # or other database provider
```

...and GORM is ready to use!

## Defining database models <a name="defining-database-models"></a>

Like other ORMs, GORM defines a table using [*models*](https://gorm.io/docs/models.html).

To define a model, you need to declare a [`struct`](https://go.dev/tour/moretypes/2) containing the information about the table. For example:

```go
type <name> struct {
    <field>  <field_type>
}
```

is the most basic form of defining a struct in Go. I assume that you have some basic knowledge about relational database storage so we won't discuss it very much here.

In order to create a GORM model, we simply need to fill in the information required. If we wanted to store a blog post in the database, then the following fields might be helpful:

- ID (unsigned integer, primary key, auto increment, required)
- Title (string, required)
- Content (string, required)
- Created at (time, defaults to current time)

So let's create a model for blog posts based on the above fields:

```go
// models/post.go
package models

import "time"

type Post struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}
```

Okay so let me explain all these.

We defined a GORM model using a struct and declared several fields. Here `uint` is `unsigned int` in other languages and `time.Time` is the datetime format in Golang.

But the backticks after the field type might be a little weird for new Go users. Those strings are called [**tags**](https://towardsdev.com/golang-struct-tags-explained-ccb589dcbb98). They are using [backtick annotation](https://stackoverflow.com/questions/46917331/what-is-the-difference-between-backticks-double-quotes-in-golang?rq=1) to define key-value pairs.

> Struct `tags` are small pieces of metadata attached to fields of a `struct` that provide instructions to other Go code that works with the struct.[^1]

The `json` defines with key should the JSON encoder use when serializing the current field into JSON format. And the `gorm` key will let GORM know some extra information about this field. For example, here we defined `ID` as a primary key for the model.

## Connecting to database <a name="connecting-to-database"></a>

So now we successfully created the database schema, let's connect it to a real database:

```go
// models/setup.go
package models

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "host=localhost user=postgres dbname=go_blog port=5432 sslmode=disable timezone=Asia/Shanghai"
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})  // change the database provider if necessary

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&Post{})  // register Post model

	DB = database
}
```

In function `ConnectDatabase()`, we first defined our data source name and established the database connection. Here I used the Postgres driver and you might change it to fit your own need.

If there's any problems when connecting to our database, `err` will point to the error. In this case, we will call `panic()` to terminate the whole process. `panic()` is a builtin function that acts similar to `raise` in Python and `throw` in JavaScript.

Then we registered our `Post` model to the database and "exported" the database variable.

Note that `DB` is a global variable that is accessible in every file of package `models`, making operations with database easier without importing everything.

...and then let's call the connection function in our `main.go`:

```go
// main.go
package main

import (
	"samzhangjy/go-blog/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()  // new!

	// ...

	router.Run("localhost:8080")
}
```

And now we've finally made a connection to the database. Time to code the request controllers!

## RESTful APIs <a name="restful-apis"></a>

Unlike the first post, we are going to put all of our request logic into a separate folder called `controllers` and import them later in `main.go` to define the routes.

### Create <a name="api-create"></a>

Let's start by adding a `create` method:

```go
// controllers/post.go
package controllers

import (
	"net/http"
	"samzhangjy/go-blog/models"

	"github.com/gin-gonic/gin"
)

type CreatePostInput struct {
	Title   string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
}

func CreatePost(c *gin.Context) {
	var input CreatePostInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post := models.Post{Title: input.Title, Content: input.Content}
	models.DB.Create(&post)

	c.JSON(http.StatusOK, gin.H{"data": post})
}
```

You might be wondering, why is there `struct` again? Well structs is an important concept in Go and you will see it a lot throughout this series. In this case, our struct `CreateBlogInput` defines body schema for request `CreateBlog`. The new tag `binding` is a Gin validation tag based on [Validator](https://github.com/go-playground/validator). If you wanted to know something about Gin bindings, here's a great read: <https://blog.logrocket.com/gin-binding-in-go-a-tutorial-with-example>.

Then let's focus on `CreateBlog()`. We first validated the request body (variable `input` here) using `context.ShouldBindJSON()`. If the body is invalid, `err` would contain some error messages. If `err` contains something, then we will simply return a 400 HTTP status code and abort the request. This `if err = statement; err != nil {}` statement is a commonly used [error handling technique](https://go.dev/blog/error-handling-and-go#simplifying-repetitive-error-handling) in Go.

If the input is valid, we will first create a `Post` model with data given from the input. Then we will call `database.Create()` to put this record into the Post table.

Finally, we will return HTTP 200 with the newly created post schema if everything goes as expected.

And let's bind our controller to a route:

```go
// main.go
package main

import (
	"samzhangjy/go-blog/controllers"
	"samzhangjy/go-blog/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()

	router.POST("/posts", controllers.CreatePost)  // here!

	router.Run("localhost:8080")
}
```

Notice that we're passing the controller function **itself** to `router.POST()`, without parentheses.

Run your app with `air` and use tools like Postman to play around with this endpoint!

### Read <a name="api-read"></a>

Then let's quickly add an endpoint to view every post created:

```go
// controllers/post.go

// ...

func FindPosts(c *gin.Context) {
	var posts []models.Post
	models.DB.Find(&posts)

	c.JSON(http.StatusOK, gin.H{"data": posts})
}
```

Unlike the previous request, this one has no request body. We defined array `posts` to store the posts created with type `models.Post`. `DB.Find(&posts)` means to find every entry that exists in the database and store the fetched result to `posts`. Remember to pass in the **pointer** instead of the actual variable!

And then quickly bind it to our router:

```go
// main.go
package main

import (
	"samzhangjy/go-blog/controllers"
	"samzhangjy/go-blog/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()

	router.POST("/posts", controllers.CreatePost)
	router.GET("/posts", controllers.FindPosts)

	router.Run("localhost:8080")
}
```

And now you could see the posts you created using `CreateBlog`!

Then let's create a route that fetches only one specified post by URL param:

```go
// controllers/post.go

// ...

func FindPost(c *gin.Context) {
	var post models.Post

	if err := models.DB.Where("id = ?", c.Param("id")).First(&post).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": post})
}
```

The new methods here is `DB.Where` and `DB.First`. `DB.Where()` lets you write SQL query commands, replacing the dynamic data with `?` and passing the actual data as the second argument. `DB.First(&post)`, like its name, selects the first name of the given collection of data and stores the result inside `post`.

`context.Param("<param-name>")` is a Gin method to fetch the URL parameter by param name. The param name is defined like:

```go
// main.go
package main

import (
	"samzhangjy/go-blog/controllers"
	"samzhangjy/go-blog/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()

	router.POST("/posts", controllers.CreatePost)
	router.GET("/posts", controllers.FindPosts)
	router.GET("/posts/:id", controllers.FindPost)  // here!

	router.Run("localhost:8080")
}
```

The slug starting with a colon `:` is defined as `url parameters` in Gin. The string after the colon is the parameter's name, which we'll use to fetch the param value.

A route `/posts/:id` will match the following:

- `/posts/1`
- `/posts/1/`

But won't match:

- `/posts/1/abcd`
- `/posts/`

### Update <a name="api-update"></a>

Then it's time for updating posts:

```go
// controllers/post.go

// ...

type UpdatePostInput struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

func UpdatePost(c *gin.Context) {
	var post models.Post
	if err := models.DB.Where("id = ?", c.Param("id")).First(&post).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	var input UpdatePostInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedPost := models.Post{Title: input.Title, Content: input.Content}

	models.DB.Model(&post).Updates(&updatedPost)
	c.JSON(http.StatusOK, gin.H{"data": post})
}
```

So we defined a struct containing request body schema again, but this time without any validation, since everything is optional. We copied the code to validate if the current post exists from the previous `FindPost()` method.

And if the post exists and the request body is valid, we will define a new model containing the contents of the newly generated post data. In this case, its name is `updatedPost`. Then we will fetch the model for the original post using `DB.Model(&post)` and update is using `model.Updates(&updatedPost)`.

`model.Updates()` will update multiple fields and won't modify the fields that didn't defined in the updated schema (`updatedPost`). `model.Update()` will only update one field at a time.

And bind it to the router:

```go
// main.go
package main

import (
	"samzhangjy/go-blog/controllers"
	"samzhangjy/go-blog/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()

	router.POST("/posts", controllers.CreatePost)
	router.GET("/posts", controllers.FindPosts)
	router.GET("/posts/:id", controllers.FindPost)
	router.PATCH("/posts/:id", controllers.UpdatePost)

	router.Run("localhost:8080")
}
```

### Delete <a name="api-delete"></a>

And finally here comes the `DELETE` operation at last:

```go
// controllers/post.go

// ...

func DeletePost(c *gin.Context) {
	var post models.Post
	if err := models.DB.Where("id = ?", c.Param("id")).First(&post).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "record not found"})
		return
	}

	models.DB.Delete(&post)
	c.JSON(http.StatusOK, gin.H{"data": "success"})
}
```

And we need to ensure that the currently given post ID is valid. Then we will call `DB.Delete(&post)` to delete the `post` entry from our database.

Then finally, bind it to our router:

```go
// main.go
package main

import (
	"samzhangjy/go-blog/controllers"
	"samzhangjy/go-blog/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	models.ConnectDatabase()

	router.POST("/posts", controllers.CreatePost)
	router.GET("/posts", controllers.FindPosts)
	router.GET("/posts/:id", controllers.FindPost)
	router.PATCH("/posts/:id", controllers.UpdatePost)
	router.DELETE("/posts/:id", controllers.DeletePost)

	router.Run("localhost:8080")
}
```

Congrats! You've successfully built a collection of simple but working CRUD restful API routes! Play it around and try to modify some parts or add some new operations!

## Conclusion <a name="conclusion"></a>

This is Part 2 of my learning Go web development. I actually learned a lot from writing this series and if there's any mistakes in the post, plz point them out!

I uploaded all the source code used in this post to [GitHub](https://github.com/samzhangjy/go-blog/tree/efc3ca87db71b3c954e894534aa4893b5fec8353). Feel free to clone it and play around with it!

I'm Sam Zhang and I'll see you guys next time!

[^1]: From [[Golang] Struct Tags explained](https://towardsdev.com/golang-struct-tags-explained-ccb589dcbb98).