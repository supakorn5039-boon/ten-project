package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/supakorn5039-boon/todo-backend/models"
	"github.com/supakorn5039-boon/todo-backend/services"
)

type TodoController struct {
	service *services.TodoService
}

func NewTodoController(services *services.TodoService) *TodoController {
	return &TodoController{services}
}

func (c *TodoController) GetTodos(ctx *gin.Context) {
	todos, err := c.service.GetAllTodos()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch todos"})
		return
	}
	ctx.JSON(http.StatusOK, todos)
}

func (c *TodoController) CreateTodo(ctx *gin.Context) {
	var todo models.Todo

	if err := ctx.ShouldBindJSON(&todo); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON input"})
		return
	}

	if err := c.service.CreateTodo(&todo); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create todo"})
		return
	}

	ctx.JSON(http.StatusCreated, todo)
}
