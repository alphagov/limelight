
# TODO: not sure if this would be better as some kind of module method
class Licences
  def self.from_backdrop_response(backdrop_response)
    licences_to_return = []
    unless backdrop_response.empty?
      if backdrop_response['data']['licenceUrlSlug']
        backdrop_response['data']['licenceUrlSlug'].each do |slug, value|
          licences_to_return.append(Licence.new(slug, value["licenceName"][0]))
        end
      end
    end
    licences_to_return
  end
end
