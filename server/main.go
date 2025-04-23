package main

import (
	"github.com/gin-gonic/gin"
	"github.com/supakorn5039-boon/todo-backend/db"
	"github.com/supakorn5039-boon/todo-backend/routes"
)

func main() {
	db.Init()
	r := gin.Default()

	routes.SetupTodoRoutes(r)

	if err := r.Run(":8080"); err != nil {
		panic(err)
	}

}
