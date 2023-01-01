MAKEFLAGS +=--no-print-directory

ifeq ($(OS),Windows_NT)
	APP_NAME := app.exe
else
	APP_NAME := app
endif

build:
	@go build -ldflags '-s -w' -o bin/$(APP_NAME) main.go
	@echo "bin/$(APP_NAME) has been generated"

run:
	@go run main.go

# npm install -g nodemon
run-watch:
	nodemon --quiet --exec "clear && make run" --ext "go"

test:
	@go test ./...

test-watch:
	nodemon --quiet --exec "clear && make test" --ext "go"

mod:
	go mod tidy

all: mod build
