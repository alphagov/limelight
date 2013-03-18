class LicensingController < ApplicationController
  
  def index
    
  end
  
  def licences
    
    api = backdrop_api
    
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

  def per_licence
    
    @licence = {
      :licenceUrlSlug => 'temporary-events-notice',
      :licenceName => "Temporary events notice"
    }
    
  end

end
