class BackdropStub
  def initialize(fixture_loader, list_of_configs)
    @fixture_loader = fixture_loader
    @stub_configs = list_of_configs
  end

  def response_for_params(params)
    response_file = @stub_configs.find { |config|
      config.matches_parameters?(params)
    }.response

    @fixture_loader.load(response_file)
  end
end
