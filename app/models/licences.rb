class Licence
  attr_accessor :name, :slug

  def initialize(slug, name)
    @name = name
    @slug = slug
  end
end

# TODO: not sure if this would be better as some kind of module method
class Licences
  def self.from_backdrop_response(backdrop_response)
    licences_to_return = []
    unless backdrop_response.empty?
      if backdrop_response['data']['licenceUrlSlug']
        backdrop_response['data']['licenceUrlSlug'].map do |slug, value|
          licences_to_return.append(Licence.new(slug, value["licenceName"][0]))
        end
      end
    end
    return licences_to_return
  end
end
