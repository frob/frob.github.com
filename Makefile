.PHONY:*

backstop:
	docker run --rm -v $(PWD)/test:/src -it backstopjs/backstopjs $(COMMAND)

backstop-approve:
	make backstop COMMAND=approve

backstop-bash:
	docker run --rm -v $(PWD)/test:/src -it --entrypoint=bash backstopjs/backstopjs

test:
	make backstop COMMAND=test

reference:
	make backstop COMMAND=reference

report:
	docker run --rm \
		-v $(PWD)/test/backstop_data/html_report:/usr/share/nginx/html \
		-v $(PWD)/test/backstop_data/bitmaps_test:/usr/share/nginx/html/bitmaps_test \
		-v $(PWD)/test/backstop_data/bitmaps_reference:/usr/share/nginx/html/bitmaps_reference \
		-p 127.0.0.1:8888:80 nginx
