package repositories

import (
	"github.com/supakorn5039-boon/todo-backend/db"
	"github.com/supakorn5039-boon/todo-backend/models"
)

type TodoRepository struct{}

func NewTodoRepository() *TodoRepository {
	return &TodoRepository{}
}

func (r *TodoRepository) GetAllTodos() ([]models.Todo, error) {
	var todos []models.Todo
	err := db.DB.Find(&todos).Error
	return todos, err
}

func (r *TodoRepository) CreateTodo(todo *models.Todo) error {
	return db.DB.Create(todo).Error
}

func (r *TodoRepository) UpdateTodo(todo *models.Todo) error {
	return db.DB.Save(todo).Error
}

func (r *TodoRepository) DeleteTodo(id uint) error {
	return db.DB.Unscoped().Delete(&models.Todo{}, id).Error
}
