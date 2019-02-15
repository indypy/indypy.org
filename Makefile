.PHONY: virtualenv
virtualenv:
	pipenv --rm
	pipenv install

.PHONY: build
build: virtualenv
	pipenv run lektor clean --yes
	pipenv run lektor build

.PHONY: serve
serve: virtualenv
	pipenv run lektor serve
