if ENV["CUCUMBER_PROFILE"] == 'sauce'

  require 'sauce/cucumber'
  require 'sauce/parallel'

  Capybara.default_driver = :sauce

  if ENV["APP_HOST"]
    # Use provided application location
    Capybara.app_host = ENV["APP_HOST"]
  else
    # Use Capybara server. To work with sauce, Capybara has to run with a
    # recognised port. List of ports recognised by Sauce can be found at
    # https://saucelabs.com/ruby
    Capybara.server_port = 49221
  end

  Sauce.config do |c|

    if ENV['USE_TUNNEL']
      c[:start_tunnel] = true
      start_tunnel_for_parallel_tests(c)
    end

    platform, name, version = ENV["BROWSER"].split(',')
    
    c[:browsers] = [[platform, name, version]]
  end

  Around do |scenario, block|
    Sauce::Capybara::Cucumber.around_hook scenario, block
  end

end

