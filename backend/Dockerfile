FROM hexpm/elixir:1.12

RUN apt-get update
RUN apt-get install --yes build-essential inotify-tools postgresql-client

RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix archive.install hex phx_new --force

WORKDIR /app

EXPOSE 4000