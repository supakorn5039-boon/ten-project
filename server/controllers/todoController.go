package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/supakorn5039-boon/todo-backend/models"
)

type TodoService interface {
	GetAllTodos() ([]models.Todo, error)
	CreateTodo(todo *models.Todo) error
	UpdateTodo(todo *models.Todo) error
	DeleteTodo(id uint) error
}

type TodoController struct {
	Service TodoService
}

func NewTodoController(service TodoService) *TodoController {
	return &TodoController{service}
}

func (controller *TodoController) GetTodos(c *gin.Context) {
	todos, err := controller.Service.GetAllTodos()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Error fetching todos"})
		return
	}
	c.JSON(http.StatusOK, todos)
}

func (controller *TodoController) CreateTodo(c *gin.Context) {
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid data"})
		return
	}
	if err := controller.Service.CreateTodo(&todo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating todo"})
		return
	}
	c.JSON(http.StatusCreated, todo)
}

func (controller *TodoController) UpdateTodo(c *gin.Context) {
	var todo models.Todo
	if err := c.ShouldBindJSON(&todo); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid data"})
		return
	}
	if err := controller.Service.UpdateTodo(&todo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error updating todo"})
		return
	}
	c.JSON(http.StatusOK, todo)
}

func (controller *TodoController) DeleteTodo(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid ID"})
		return
	}
	if err := controller.Service.DeleteTodo(uint(id)); err != nil {
		c.JSON(500, gin.H{"message": "Error deleting todo"})
		return
	}
	c.JSON(200, gin.H{"message": "Todo deleted"})
}
