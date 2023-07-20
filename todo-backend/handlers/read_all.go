package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/SamuelLucasVM/GoLangToDoList/models"
)

func ReadAll(w http.ResponseWriter, r *http.Request) {
	todos, err := models.GetAll()
	if err != nil {
		log.Printf("Error ao ler tasks: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "aplication/json")
	json.NewEncoder(w).Encode(todos)
}
