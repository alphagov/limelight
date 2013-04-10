class Authority
  attr_accessor :slug, :name
  def initialize(slug, name)
    @slug = slug
    @name = name
  end

  def self.from_backdrop_response(backdrop_response)
    unless backdrop_response['data'].count == 1
      raise "expected a response with one entry, got #{backdrop_response}"
    end

    authority = backdrop_response['data'].first
    if authority["authorityName"].blank?
      name = authority["authorityUrlSlug"]
    else
      name = authority["authorityName"].first
    end
    self.new(authority['authorityUrlSlug'], name)
  end
end
