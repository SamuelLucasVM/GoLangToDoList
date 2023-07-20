package main

import (
	"fmt"
	"net/http"

	"github.com/SamuelLucasVM/GoLangToDoList/configs"
	"github.com/SamuelLucasVM/GoLangToDoList/handlers"
	"github.com/rs/cors"

	"github.com/go-chi/chi/v5"
)

func main() {
	err := configs.Load()
	if err != nil {
		panic(err)
	}

	router := chi.NewRouter()

	corsHandle := setupCORS()

	router.Use(corsHandle.Handler)

	router.Post("/", handlers.Create)
	router.Put("/{id}", handlers.Update)
	router.Delete("/{id}", handlers.Delete)
	router.Get("/", handlers.ReadAll)
	router.Get("/{id}", handlers.Read)
	router.Put("/do/{id}", handlers.DoTask)

	http.ListenAndServe(fmt.Sprintf(":%s", configs.GetApiPort()), router)
}

func setupCORS() *cors.Cors {
	corsOptions := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	return corsOptions
}
