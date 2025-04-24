package controllers

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/supakorn5039-boon/todo-backend/models"
)

func setUpRouter(controller *TodoController) *gin.Engine {
	r := gin.Default()
	r.GET("/todos", controller.GetTodos)
	r.POST("/todos", controller.CreateTodo)
	r.PUT("/todos/:id", controller.UpdateTodo)
	r.DELETE("/todos/:id", controller.DeleteTodo)
	return r
}

type MockService struct{}

func (m *MockService) GetAllTodos() ([]models.Todo, error) {
	return []models.Todo{{ID: 1, Title: "Mock Todo"}}, nil
}
func (m *MockService) CreateTodo(todo *models.Todo) error {
	todo.ID = 999
	return nil
}
func (m *MockService) UpdateTodo(todo *models.Todo) error { return nil }
func (m *MockService) DeleteTodo(id uint) error           { return nil }

func TestGetTodos(t *testing.T) {
	controller := NewTodoController(&MockService{})
	router := setUpRouter(controller)

	req, _ := http.NewRequest("GET", "/todos", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestCreateTodo(t *testing.T) {
	controller := NewTodoController(&MockService{})
	router := setUpRouter(controller)

	reqBody := `{"title":"Test Todo"}`
	req, _ := http.NewRequest("POST", "/todos", strings.NewReader(reqBody))
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)
}

func TestUpdateTodo(t *testing.T) {
	controller := NewTodoController(&MockService{})
	router := setUpRouter(controller)

	reqBody := `{"title":"Updated Todo"}`
	req, _ := http.NewRequest("PUT", "/todos/1", strings.NewReader(reqBody))
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestDeleteTodo(t *testing.T) {
	controller := NewTodoController(&MockService{})
	router := setUpRouter(controller)

	req, _ := http.NewRequest("DELETE", "/todos/1", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}
