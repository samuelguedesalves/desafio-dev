# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :backend,
  ecto_repos: [Backend.Repo],
  generators: [binary_id: true]

# Configures the endpoint
config :backend, BackendWeb.Endpoint,
  url: [host: "localhost", port: 4000],
  render_errors: [view: BackendWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Backend.PubSub,
  live_view: [signing_salt: "7vtjGX7L"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :backend, Backend.Guardian,
  issuer: "auth",
  secret_key: "Sgc5o54VjFFBEvd+Xg85Fv0s8/IU45ZrMYV09SfLyDfqZYPFu2fPG5trshxGXGlu"

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
