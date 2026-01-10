FROM ruby:2.3.3

# Set environment variables
ENV NOKOGIRI_USE_SYSTEM_LIBRARIES=true

# Set working directory
WORKDIR /site

# Copy Gemfile first for better layer caching
COPY Gemfile* ./

# Install dependencies
RUN bundle install

# Copy the rest of the site
COPY . .

# Expose port for serving
EXPOSE 4000

# Default command - build and serve
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
