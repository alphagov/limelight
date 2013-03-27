class Licence
  attr_accessor :name, :slug

  def initialize(slug, name)
    @name = name
    @slug = slug
  end

  def self.from_backdrop_response(slug, backdrop_response)
    licences = backdrop_response["data"]["licenceUrlSlug"]
    self.new(slug, licences[slug]["licenceName"][0])
  end
end
