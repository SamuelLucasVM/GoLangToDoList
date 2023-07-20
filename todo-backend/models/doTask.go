package models

import "github.com/SamuelLucasVM/GoLangToDoList/db"

func DoTask(id int64) (int64, error) {
	conn, err := db.OpenConnection()
	if err != nil {
		return 0, err
	}
	defer conn.Close()

	res, err := conn.Exec(`UPDATE todos SET done=NOT done WHERE id=$1`, id)
	if err != nil {
		return 0, err
	}

	return res.RowsAffected()
}
