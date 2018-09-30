
MAKEFLAGS := --no-print-directory

all:
	make dist/js/domitter.js 
	make dist/js/domitter.min.js 
	make dist/css/domitter.min.css

dist/js/domitter.js: src/copyright.js src/namespace-beginning.js src/domitter-span.js src/domitter-cache.js src/domitter-character.js src/domitter-caches.js src/domitter-characters.js src/domitter-collection-span.js src/domitter-cache-collection.js src/domitter-character-collection.js src/domitter-container.js src/domitter-root-container.js src/domitter-ellipsis.js src/domitter-builder.js src/domitter-root-builder.js src/domitter-omissioner.js src/domitter-lines.js src/domitter-height.js src/domitter.js src/domitters.js src/namespace-end.js
	cat src/copyright.js src/namespace-beginning.js  src/domitter-span.js src/domitter-cache.js src/domitter-character.js src/domitter-caches.js src/domitter-characters.js src/domitter-collection-span.js src/domitter-cache-collection.js src/domitter-character-collection.js src/domitter-container.js src/domitter-root-container.js src/domitter-ellipsis.js src/domitter-builder.js src/domitter-root-builder.js src/domitter-omissioner.js src/domitter-lines.js src/domitter-height.js src/domitter.js src/domitters.js src/namespace-end.js > dist/js/domitter.js 

dist/js/domitter.min.js: dist/js/domitter.js
	npx google-closure-compiler --compilation_level=ADVANCED --js=dist/js/domitter.js --js_output_file=dist/js/domitter.min.js

dist/css/domitter.min.css: dist/css/domitter.css
ifdef YUICOMPRESSOR
	$(YUICOMPRESSOR) dist/css/domitter.css -o dist/css/domitter.min.css
endif 
