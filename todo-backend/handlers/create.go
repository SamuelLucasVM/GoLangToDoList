package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/SamuelLucasVM/GoLangToDoList/models"
)

func Create(w http.ResponseWriter, r *http.Request) {
	var todo models.Todo

	err := json.NewDecoder(r.Body).Decode(&todo)
	if err != nil {
		log.Printf("Error ao fazer decode do json: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	id, err := models.Insert(todo)

	var res map[string]any

	if err != nil {
		res = map[string]any{
			"Error":   true,
			"Message": fmt.Sprint(err),
		}
	} else {
		res = map[string]any{
			"Error":   false,
			"Message": fmt.Sprint("Task adicionada com sucesso! Id:$1", id),
		}
	}

	w.Header().Add("Content-Type", "aplication/json")
	json.NewEncoder(w).Encode(res)
}
