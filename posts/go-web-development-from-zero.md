---
title: Learning Go Web Development From Zero
desc: Today I wanted to explore the field of backend development - so I chose Go. And sadly, I have absolutely no experience in Go development before. So I started this series of blog in order to keep track on myself. I will try to "record" what I've done and write some main concepts in my posts.
cover: /assets/posts/go-web-development-from-zero.jpg
date: 2022.05.26
tags:
  - golang
  - web
---

Hey guys, I'm Sam Zhang.

Today I wanted to explore the field of backend development - so I chose Go. The main reason I chose Go instead of other languages (such as Java), is because Go is kinda a new language (at least in my opinion) .

And sadly, I have absolutely no experience in Go development before. So I started this series of blog in order to keep track on myself. I will try to "record" what I've done and write some main concepts in my posts.

Of course, because I'm still a beginner (or newbie?) in Go, so there might be some incorrect stuff here. If so, please leave me a comment to help me improve!

Then let's get started!

## Installing Go

Unlike many other languages, installing Go is quite simple, at least for me.

Go ahead and download the official installer at the [Go download page](https://go.dev/dl). Run it, then you're all set!

Go comes with its command line tool `go` by default. It includes a set of commands such as `run`, `get`, `mod`, etc. For sure, I'm going to use those command a lot in this series. Check out the full list of commands [here](https://pkg.go.dev/cmd/go).

## Installing Gin

I Googled about which Go web framework is the best for beginners, but turned out to be not that helpful. However, a lot of them mentioned [**Gin**](https://gin-gonic.com/) and has almost 60k stars on [GitHub](https://github.com/gin-gonic/gin). So I chose Gin as my framework to get started.

Create a new folder to contain your project and follow the [instructions](https://gin-gonic.com/docs/quickstart/#installation) of installation.

### Troubleshooting

If you're a total beginner like me, you might be facing the following problem when running `go get`:

```bash
$ go get -u github.com/gin-gonic/gin
go: go.mod file not found in current directory or any parent directory.
        'go get' is no longer supported outside a module.
        To build and install a command, use 'go install' with a version,
        like 'go install example.com/cmd@latest'
        For more information, see https://golang.org/doc/go-get-install-deprecation
        or run 'go help get' or 'go help install'.
```

This means that you don't have a module created in the current folder. `go mod` is a command for managing Go modules. We'll use `go mod init` command to generate a new module.

The `go mod init` command accepts one argument, *module-path* . I'm not so sure about this argument right now and I understand it like the name of the module. The format of *module-path* should be as follows:

```
lorem/ipsum/dor
```

Then run `go mod init <module-path>` , replacing `<module-path>` with your own module path. After that, you should be able to install `gin-gonic` correctly.

## Writing the first Gin request

So now we're all set with environments. Let's write a simple "Hello World" request in Go.

Create a new file named `main.go` in the root folder and fill in the following code:

```go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()  // router with default middleware installed
	// index route
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello World",
		})
	})
	// run the server
	router.Run()
}
```

Then run `go run main.go` and open up <http://localhost:8080> . Hopefully a Hello World will come up all right:

```json
{
    "message": "Hello World"
}
```

### Understanding the Hello World code

So... what the hell is going on here? Let's take a look at our code.

We've declared package `main` and imported some useful packages to our code. I'll try my best to explain code in `main()` function line by line.

So on line 10 we've declared a variable called `router`. `gin.Default` returns a router with default middleware (stuff like Logger and Recovery middleware) attached. You might be wondering, what in the world is `:=` ? Well, it's similar to `=` in other programming languages. In Golang, a single `=` means **assignment** and `:=` means **declare and assignment**. E.g:

```go
var router = gin.Default()
```

Is equivalent to:

```go
router := gin.Default()
```

The `:=` operator is called [**Short variable declarations**](https://go.dev/ref/spec#Short_variable_declarations). More information see [this StackOverflow question](https://stackoverflow.com/questions/17891226/difference-between-and-operators-in-go).

On line 12 ~ 16, we defined a GET request mapping to `/` and returns a JSON response. `router.GET()`, of course, defines a GET request. Its second argument accepts a callable function whereas that function will receive an argument with type `gin.Context`.

The context variable is named `c` in this case. `*gin.Context` is a pointer to the `gin.Context` value. The contexts in Gin provides a lot of features such as middleware and responses. For Chinese readers, you can take a look at [this article](https://www.topgoer.com/gin%E6%A1%86%E6%9E%B6/gin%E6%BA%90%E7%A0%81%E8%A7%A3%E8%AF%BB/gin%E7%89%9B%E9%80%BC%E7%9A%84context.html) for a more in-depth view of `gin.Context`.

On line 13 we called `c.JSON()` to response this request with content whose MIME type is `application/json`. `http.StatusOK` is a constant variable for the HTTP status code `200 success`, which is from the builtin package `net/http`.

`gin.H` is a short-handed version of defining type for JSON data. If you'd like to nest JSON objects inside JSON objects, you can write something like:

```go
gin.H{
    "some-data": gin.H{
        "message": "success"
    }
}
```

And finally on line 18, we run the server on the default port 8080.

### Live reloading

Now if you wanted to change the content of your Go application, you need to restart the development server every time you change something in order to test the newly added code.

So some web frameworks (such as Python Flask) has a builtin hot reloader for the development server. Unfortunately, Gin doesn't come with that. I chose to use [air](https://github.com/cosmtrek/air) as my auto reloader and of course you can use others.

Setting up Air is quite simple. Run the following command to install it:

```bash
curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin
```

This will install Air to your `$GOPATH`, which is default to `~/go` . Then append it to your `$PATH` by adding the following line to your `.bashrc` (or `.zshrc`):

```bash
export PATH=$PATH:$(go env GOPATH)/bin
```

...and you're all set! Run `air init` to generate a default Air configuration.

Using Air is even simpler. Just run `air` in your command line and Air run `main.go` in the current folder and will automatically watch for changes in your source code.

> Tip for macOS users: if you don't want to see the annoying popup every time Air reloads your code, simply replace

```go
router.Run()
```

with

```go
router.Run("localhost:8080")
```

## Conclusion

So... I finally finished the Gin hello world! I put all my source code to [GitHub](https://github.com/samzhangjy/go-blog) and hopefully I will be updating it. Clone it if you found something useful or just to play around!

I'm Sam Zhang and I'll see ya next time!