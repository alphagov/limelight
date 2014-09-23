require_relative "../../features/backdrop_stub/backdrop_stub"
require_relative "../../features/backdrop_stub/stub_config"
require_relative "../../features/backdrop_stub/fixture_loader"

class BackdropStubController < ApplicationController
  @@backdrop_stub = BackdropStub.new(
      FixtureLoader.new('features/backdrop_stub_responses/'),
      [
          StubConfig.new({'service' => 'licensing', 'api_name' => 'realtime'}, 'licensing_realtime.json'),
          StubConfig.new({'service' => 'licensing', 'api_name' => 'monitoring'}, 'licensing_availability_response.json'),
          StubConfig.new({'service' => 'licensing', 'api_name' => 'application', 'filter_by' => 'licenceUrlSlug:application-to-licence-a-street-collection'}, 'application-to-licence-a-street-collection.json'),
          StubConfig.new({'service' => 'licensing', 'api_name' => 'application', 'filter_by' => 'authorityUrlSlug:fake-authority-1', 'group_by' => 'licenceUrlSlug'}, 'licensing_top_5_licenses.json'),
          StubConfig.new({'service' => 'licensing', 'api_name' => 'application', 'filter_by' => 'authorityUrlSlug:fake-authority-1', 'period' => 'week'}, 'licensing_top.json'),
          StubConfig.new({'service' => 'licensing', 'api_name' => 'application', 'filter_by' => 'authorityUrlSlug:fake-authority-1'}, 'fake-authority-1.json'),
          StubConfig.new({'service' => 'licensing', 'api_name' => 'application', 'group_by' => "authorityUrlSlug"}, 'authorities.json'),
          StubConfig.new({'service' => 'licensing', 'api_name' => 'application', 'group_by' => "licenceUrlSlug"}, 'licences.json'),
          StubConfig.new({'service' => 'licensing', 'api_name' => 'application'}, 'licensing_applications.json'),
          StubConfig.new({'filter_by' => 'dataType:licensing_overview_journey'}, 'licensing_overview_journey.json'),
      ])

  def serve_fixture
    render :json => @@backdrop_stub.response_for_params(params)
  end

  def self.register(service, bucket, fixture_file)
    @@backdrop_stub.register(StubConfig.new({'service' => service, 'api_name' => bucket}, fixture_file))
  end

  def self.reset
    @@backdrop_stub.clear
  end
end
