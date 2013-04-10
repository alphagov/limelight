class Authorities
  def self.from_backdrop_response(backdrop_response)
    authorities_to_return = []
    unless backdrop_response["data"].empty?
      backdrop_response["data"].each do |authority_data|
        authorities_to_return.append(Authority.create(authority_data))
      end
    end
    authorities_to_return
  end
end
