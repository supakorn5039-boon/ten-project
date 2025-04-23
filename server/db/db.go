// db/db.go
package db

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/supakorn5039-boon/todo-backend/models"
)

var DB *gorm.DB

func Init() {
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		getEnv("DB_HOST", "${DB_HOST}"),
		getEnv("DB_PORT", "${DB_PORT}"),
		getEnv("DB_USER", "${DB_USER}"),
		getEnv("DB_PASSWORD", "${DB_PASSWORD"),
		getEnv("DB_NAME", "${DB_NAME}"),
	)

	var err error
	DB, err = gorm.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	DB.AutoMigrate(&models.Todo{})
	fmt.Println("✅ Connected to PostgreSQL!")
}

func getEnv(key, fallback string) string {
	val := os.Getenv(key)
	if val == "" {
		return fallback
	}
	return val
}
