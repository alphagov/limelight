
# TODO: not sure if this would be better as some kind of module method
class Licences
  def self.from_backdrop_response(backdrop_response)
    licences_to_return = []
    unless backdrop_response.empty?
      if backdrop_response['data']
        backdrop_response['data'].each do |licence_data|
          if licence_data["licenceName"].blank?
            name = licence_data["licenceUrlSlug"]
          else
            name = licence_data["licenceName"].first
          end
          licences_to_return.append(Licence.new(licence_data["licenceUrlSlug"],
                                                name))
        end
      end
    end
    licences_to_return
  end
end
