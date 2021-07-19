package main

import (
	"os"
	"net/http"
	"encoding/json"
	"github.com/sourcegraph/go-ses"
)

type Email struct{
	Title string
	Body string
}

func main() {
	http.HandleFunc("/email", SendEmail)
	http.ListenAndServe(":3000", nil)
}

func SendEmail(w http.ResponseWriter, r *http.Request) {
	var e Email

	if r.Body == nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("email error, send a title and body"))
		return
	}

	email := os.Getenv("EMAIL")
	from := email
	to := email

	json_err := json.NewDecoder(r.Body).Decode(&e)

	if json_err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("email error"))
		return
	}

	_, email_err := ses.EnvConfig.SendEmail(from, to, e.Title, e.Body)

	if email_err == nil {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("email success"))
	} else {
		w.WriteHeader(http.StatusTeapot)
		w.Write([]byte("email error"))
	}
}
