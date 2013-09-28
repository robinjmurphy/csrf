serve:
	node trusted-site/app.js & node dodgy-site/app.js

install-deps:
	cd ./trusted-site && npm install
	cd ./dodgy-site && npm install
	cd ./cucumber && bundle

test:
	cd cucumber && bundle exec cucumber

.PHONY: serve deps test