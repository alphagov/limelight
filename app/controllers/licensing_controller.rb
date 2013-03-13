class LicensingController < ApplicationController
  
  def index
    
  end
  
  def licences
    
    api = BackdropAPI.new(config.backdrop_url)
    
    response = api.get_licences
    
    if response["data"]["licenceUrlSlug"]
      
      @licences = response["data"]["licenceUrlSlug"].map do |slug, value|
        {
          :licenceUrlSlug => slug,
          :licenceName => value["licenceName"][0]
        }
      end
    else
      @licences = []
    end
    
  end

end
