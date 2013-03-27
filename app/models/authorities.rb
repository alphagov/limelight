class Authority
  attr_accessor :slug, :name
  def initialize(slug, name)
    @slug = slug
    @name = name
  end
end

class Authorities
  def self.from_backdrop_response(backdrop_response)
    backdrop_response["data"]["authorityUrlSlug"].map do |slug, value|
      Authority.new(slug, value["authorityName"][0])
    end
  end
end