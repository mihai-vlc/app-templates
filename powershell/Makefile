MAKEFLAGS +=--no-print-directory

run:
	@pwsh -NoProfile ./main.ps1

# npm install -g nodemon
run-watch:
	nodemon --quiet --exec "clear && make run" --ext "ps1,psm1"

test:
	@pwsh -NoProfile -NonInteractive -Command 'Invoke-Pester'

test-watch:
	nodemon --quiet --exec "clear && make test" --ext "ps1,psm1"

all: run

