FROM ruby:3.1

# Set work directory
WORKDIR /home/lanyon

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

# Ensure the latest bundler is installed
RUN gem install bundler

# Copy the Gemfile and Gemfile.lock into the image
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy the rest of your application into the image
COPY . .

# Specify the command to run
CMD ["jekyll", "serve", "--host", "0.0.0.0"]
