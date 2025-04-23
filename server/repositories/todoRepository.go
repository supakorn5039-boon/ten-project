package repositories

import (
	"github.com/supakorn5039-boon/todo-backend/db"
	"github.com/supakorn5039-boon/todo-backend/models"
)

type TodoRepository struct {}

func NewTodoRepository() *TodoRepository {
	return &TodoRepository{}
}

//* GetAllTodos
func (r *TodoRepository) GetAllTodos() ([]models.Todo , error) {
	var todos []models.Todo
	err := db.DB.Find(&todos).Error
	return todos, err
}

//* CreateTOdo
func (r *TodoRepository) CreateTodo(todo *models.Todo) error {
	return db.DB.Create(todo).Error
}