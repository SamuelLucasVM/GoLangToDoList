package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/SamuelLucasVM/GoLangToDoList/models"
	"github.com/go-chi/chi/v5"
)

func Read(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "id"))
	if err != nil {
		log.Printf("Error ao fazer o parse do id: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	todo, err := models.Get(int64(id))
	if err != nil {
		log.Printf("Error ao ler task: %v", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	w.Header().Add("Content-Type", "aplication/json")
	json.NewEncoder(w).Encode(todo)
}
