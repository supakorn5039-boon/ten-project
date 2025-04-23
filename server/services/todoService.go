package services

import (
	"github.com/supakorn5039-boon/todo-backend/models"
	"github.com/supakorn5039-boon/todo-backend/repositories"
)

type TodoService struct{
	repo *repositories.TodoRepository
}

func NewTodoService(repo *repositories.TodoRepository) *TodoService {
	return &TodoService{repo}
}

func (s *TodoService) GetAllTodos() ([]models.Todo ,error) {
	return s.repo.GetAllTodos()
}

func (s *TodoService) CreateTodo(todo *models.Todo) error {
	return s.repo.CreateTodo(todo)
}

