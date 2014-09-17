Limelight::Application.routes.draw do
  get "/performance" => "root#index", as: "root"

  get "/_status" => "healthcheck#index", as: "status"

  match "/performance/services" => "common#services", via: :get, as: "services"

  if Rails.env.test? or Rails.env.development?
    match "/backdrop_stub/performance/:service/api/:api_name" => "backdrop_stub#serve_fixture", via: :get
  end

  match "/performance/licensing/licences/:slug" => "licensing#per_licence", via: :get, as: "licence"
  match "/performance/licensing/authorities/:slug" => "licensing#per_authority", via: :get, as: "authority"
  match "/performance/licensing/licences" => "licensing#licences", via: :get, as: "all_licenses"
  match "/performance/licensing/authorities" => "licensing#authorities", via: :get, as: "all_authorities"
  match "/performance/licensing" => "licensing#index", via: :get, as: "licensing"

end
