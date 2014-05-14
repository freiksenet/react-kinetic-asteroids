OUT := build

package := ./package.json
deps := ./node_modules
deps_installed := $(deps)/installed

browserify := $(deps)/browserify/bin/cmd.js
browserify_flags := -r ./react-kinetic-asteroids
beefy := $(deps)/beefy/bin/beefy

js_files := $(shell find src/ -type f -name '*.js')
static_files := $(shell find static/ -type f)

$(OUT):
	mkdir $(OUT)

$(deps_installed): $(package)
	npm list > /dev/null 2> /dev/null; echo $$? && rm -rf deps
	npm install --silent
	touch $@

$(OUT)/react-kinetic-asteroids.js: react-kinetic-asteroids.js $(js_files) $(deps_installed) $(OUT)
	$(browserify) . $(browserify_flags) -o $@

.PHONY: demo
demo: $(deps_installed)
	$(beefy) react-kinetic-asteroids.js --live --browserify $(browserify) -- $(browserify_flags)

$(OUT)/index.html: index.html $(OUT)
	cp $< $@

$(OUT)/static/copied: $(static)
	cp -r static $(OUT)/
	touch $@

dist: $(OUT)/react-kinetic-asteroids.js $(OUT)/index.html $(OUT)/static/copied

.PHONY: clean-npm
clean-npm:
	rm -rf $(deps)

.PHONY: clean
clean:
	rm -rf $(OUT)

origin := $(shell git config --get remote.origin.url)

.PHONY: pages
pages: dist
	cd $(OUT) && \
	git init . && \
	git add . && \
	git commit -m "Update pages"; \
	git push $(origin) master:gh-pages --force && \
	rm -rf .git
