package services

import (
	"github.com/supakorn5039-boon/todo-backend/models"
	"github.com/supakorn5039-boon/todo-backend/repositories"
)

type TodoServiceInterface interface {
	GetAllTodos() ([]models.Todo, error)
	CreateTodo(todo *models.Todo) error
	UpdateTodo(todo *models.Todo) error
	DeleteTodo(id uint) error
}

type TodoService struct {
	repo *repositories.TodoRepository
}

func NewTodoService(repo *repositories.TodoRepository) *TodoService {
	return &TodoService{repo}
}

func (s *TodoService) GetAllTodos() ([]models.Todo, error) {
	return s.repo.GetAllTodos()
}

func (s *TodoService) CreateTodo(todo *models.Todo) error {
	return s.repo.CreateTodo(todo)
}

func (s *TodoService) UpdateTodo(todo *models.Todo) error {
	return s.repo.UpdateTodo(todo)
}

func (s *TodoService) DeleteTodo(id uint) error {
	return s.repo.DeleteTodo(id)
}
