class Authorities
  def self.from_backdrop_response(backdrop_response)
    authorities_to_return = []
    unless backdrop_response["data"].empty?
      backdrop_response["data"].each do |authority_data|
        if authority_data["authorityName"].blank?
          name = authority_data["authorityUrlSlug"]
        else
          name = authority_data["authorityName"].first
        end
        authorities_to_return.append(Authority.new(authority_data["authorityUrlSlug"],
                                                   name))
      end
    end
    authorities_to_return
  end
end
