class ApplicationController < ActionController::Base
  protect_from_forgery
  
  # use 'homepage' template to remove global navigation element
  include Slimmer::Template
  slimmer_template :homepage

  def backdrop_api
    Rails.configuration.use_api_stub ? BackdropAPIStub.new : BackdropAPI.new(backdrop_url, backdrop_auth())
  end

  def backdrop_auth
    if Rails.application.config.respond_to? :backdrop_auth
      Rails.application.config.backdrop_auth
    else
      nil
    end
  end

  def backdrop_url
    Rails.application.config.backdrop_url
  end
end
