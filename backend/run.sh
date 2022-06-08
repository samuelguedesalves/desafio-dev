#!/bin/sh

set -e

mix deps.get

export PGPASSWORD="postgres"

until psql -h db -U "postgres" -c '\q' 2>/dev/null; do
  >&2 echo "Postgres não disponível"
  sleep 1
done

echo "\nPostgres disponível: continuando com o setup de banco de dados..."

if mix help credo >/dev/null 2>&1
then
  echo "\nProcurando Credo..."
  mix credo || true
else
  echo "\nConfiguração do Credo não encontradas"
fi

mix ecto.create
mix ecto.migrate

echo "\nExecutando testes..."
mix test

echo "\nIniciando servidor web Phoenix..."
mix phx.server
