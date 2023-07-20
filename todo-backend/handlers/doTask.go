package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/SamuelLucasVM/GoLangToDoList/models"
	"github.com/go-chi/chi/v5"
)

func DoTask(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		log.Printf("Error ao fazer o parse do id: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	rows, err := models.DoTask(int64(id))
	if err != nil {
		log.Printf("Error ao atualizar task: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	if rows > 1 {
		log.Printf("Error: %v tasks foram atualizadas.", rows)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	res := map[string]any{
		"Error":   false,
		"Message": fmt.Sprintf("Task de id %v done", id),
	}

	w.Header().Add("Content-Type", "aplication/json")
	json.NewEncoder(w).Encode(res)
}
