FROM elixir:1.12.3

RUN apt-get update
RUN apt-get install --yes build-essential inotify-tools postgresql-client

RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix archive.install hex phx_new 1.6.6 --force

WORKDIR /app

EXPOSE 4000