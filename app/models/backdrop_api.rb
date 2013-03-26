require "songkick/transport"

Songkick::Transport.logger = Rails.logger
Transport = Songkick::Transport::HttParty

class BackdropAPI
  
  def initialize(backdrop_url, credentials=nil)
    @backdrop_url = backdrop_url
    @credentials = credentials
  end
  
  def get_licences
    response = get("/performance/licensing/api?group_by=licenceUrlSlug&collect=licenceName&period=week")
    response.data
  end

  def get_licence(slug)
    response = get("/performance/licensing/api?filter_by=licenceUrlSlug:#{slug}&group_by=licenceUrlSlug&collect=licenceName&period=all")
    response.data
  end

  def get(path)
    transport = Songkick::Transport::HttParty.new(@backdrop_url, :user_agent => "Limelight", :timeout => 30)

    if @credentials.present?
      transport = transport.with_headers("Authorization" => "Basic: #{@credentials[:username]}:#{@credentials[:password]}")
    end

    transport.get(path)
  end

end
