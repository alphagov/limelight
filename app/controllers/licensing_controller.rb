class LicensingController < ApplicationController
  
  def index
    
  end
  
  def licences
    @licences = Licences.from_backdrop_response(backdrop_api.get_licences)
  end

  def per_licence
    slug = params[:slug]
    begin
      @licence = Licence.from_backdrop_response(slug, backdrop_api.get_licence(slug))
    rescue Exception => e
      raise ActionController::RoutingError.new('Licence not found.')
    end
  end

  def authorities
    @authorities = Authorities.from_backdrop_response(backdrop_api.get_authorities)
  end

end
