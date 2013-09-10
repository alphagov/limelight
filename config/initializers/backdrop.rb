backdrop_location = (Rails.env.test? || ENV["USE_STUB_API"]) ? '/backdrop_stub' : '/'
Limelight::Application.config.backdrop_url = ENV["BACKDROP_URL"] || backdrop_location

Limelight::Application.config.backdrop_port = ENV["BACKDROP_PORT"] || "3000"
