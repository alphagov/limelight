if ENV["CUCUMBER_PROFILE"] == 'sauce'

  require 'sauce/cucumber'
  require 'sauce/parallel'

  Capybara.default_driver = :sauce

  app_host = ENV["APP_HOST"] || 'http://limelight.dev.gov.uk'
  Capybara.app_host = app_host

  Sauce.config do |c|

    if ENV['USE_TUNNEL']
      start_tunnel_for_parallel_tests(c)
    end
    
    browser_name = ENV["BROWSER_NAME"]
    browser_platform = ENV["BROWSER_PLATFORM"]
    browser_version = ENV["BROWSER_VERSION"]

    c[:browsers] = [[browser_platform, browser_name, browser_version]]

  end

end

