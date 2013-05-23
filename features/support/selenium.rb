if ENV["CUCUMBER_PROFILE"] == 'selenium'

  driver_host = ENV["DRIVER_HOST"]

  if !driver_host
    raise "No driver host defined"
  end

  driver_port = ENV["DRIVER_PORT"] || '4444'

  browser_name = ENV["BROWSER_NAME"] || 'chrome'
  browser_platform = ENV["BROWSER_PLATFORM"]
  browser_version = ENV["BROWSER_VERSION"]

  app_host = ENV["APP_HOST"] || 'http://limelight.dev.gov.uk'

  Capybara.app_host = app_host
  Capybara.run_server = false

  capabilities = {
    :browser_name => browser_name
  }
  
  capabilities[:platform] = browser_platform if browser_platform
  capabilities[:version] = browser_version if browser_version

  require 'selenium-webdriver'

  Capybara.register_driver :remote do |app|
    Capybara::Selenium::Driver.new(app,
      :browser => :remote,
      :url => "http://#{driver_host}:#{driver_port}/wd/hub",
      :desired_capabilities => Selenium::WebDriver::Remote::Capabilities.new(
        capabilities
      )
    )
  end

  Capybara.default_driver = :remote
end

