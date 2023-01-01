build:
	@go build -o bin/app main.go
	@echo "bin/app has been generated"

run:
	@go run main.go

run-watch:
	@gow -c run main.go

test:
	@go test ./...

test-watch:
	@gow -c test ./...

mod:
	go mod tidy

all: build
