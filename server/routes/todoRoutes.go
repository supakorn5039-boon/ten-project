package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/supakorn5039-boon/todo-backend/controllers"
	"github.com/supakorn5039-boon/todo-backend/repositories"
	"github.com/supakorn5039-boon/todo-backend/services"
)

func SetupTodoRoutes(r *gin.Engine) {
	todoRepo := repositories.NewTodoRepository()
	todoService := services.NewTodoService(todoRepo)
	TodoController := controllers.NewTodoController(todoService)

	api := r.Group("/api")
	{
		api.GET("/todos", TodoController.GetTodos)
		api.POST("/todos", TodoController.CreateTodo)
	}
}
