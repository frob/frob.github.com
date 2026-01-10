.PHONY: build-docker build serve dev test clean

# Build the Docker image
build-docker:
	docker build -t jekyll-site .

# Run jekyll build to generate _site
build: build-docker
	docker run --rm jekyll-site bundle exec jekyll build

# Run the container to serve the site locally with nginx
serve: build
	docker run --rm -p 8888:80 -v $$(pwd)/_site:/usr/share/nginx/html:ro nginx:alpine

# Run with live reloading (mount local directory)
dev: build-docker
	docker run --rm -p 4000:4000 -v $$(pwd):/site jekyll-site bundle exec jekyll serve --host 0.0.0.0 --force_polling

# Test the build (matches CI)
test: build
	@echo "Site build successful!"

# Clean up Docker images
clean:
	docker rmi jekyll-site || true
