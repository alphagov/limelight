require "songkick/transport"

Songkick::Transport.logger = Rails.logger
Transport = Songkick::Transport::HttParty

class BackdropAPI
  
  def initialize(backdrop_url)
    @backdrop_url = backdrop_url
  end
  
  def get_licences
    transport = Songkick::Transport::HttParty.new(@backdrop_url, :user_agent => "Limelight", :timeout => 30)
    response = transport.get("/licensing/?group_by=licenceUrlSlug&collect=licenceName&period=all")
    response.data
  end
  
end
