class Licence
  attr_accessor :name, :slug

  def initialize(slug, name)
    @name = name
    @slug = slug
  end

  def self.from_backdrop_response(backdrop_response)
    if backdrop_response["data"].count != 1
      raise "expected exactly one entry, got #{backdrop_response}"
    end
    licence = backdrop_response["data"].first
    if licence["licenceName"].blank?
      name = licence["licenceUrlSlug"]
    else
      name = licence["licenceName"].first
    end
    self.new(licence["licenceUrlSlug"], name)
  end
end
