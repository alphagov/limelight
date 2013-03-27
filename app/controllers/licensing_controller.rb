class LicensingController < ApplicationController
  
  def index
    
  end
  
  def licences
    
    @licences = Licences.from_backdrop_response(backdrop_api.get_licences)
    
  end

  def per_licence
    
    slug = params[:slug]
    
    api = backdrop_api
    
    response = api.get_licence(slug)
    
    data = response["data"]["licenceUrlSlug"]
    
    if data && data[slug]
      
      @licence = {
        :licenceUrlSlug => slug,
        :licenceName => response["data"]["licenceUrlSlug"][slug]["licenceName"][0]
      }
      
    else
      raise ActionController::RoutingError.new('Licence not found.')
    end
  end

end
