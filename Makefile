NODEUNIT=./node_modules/.bin/nodeunit

.PHONY: test

test:
	$(NODEUNIT) test/*.js

