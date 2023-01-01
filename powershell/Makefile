run:
	@pwsh ./main.ps1

test:
	@pwsh -NoProfile -NonInteractive -Command 'Invoke-Pester'

test-watch:
	while true; do \
		make test; \
		inotifywait -qre close_write .; \
	done

all: run

