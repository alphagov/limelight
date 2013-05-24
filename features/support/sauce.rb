if ENV["CUCUMBER_PROFILE"] == 'sauce'

  require 'sauce/cucumber'
  require 'sauce/parallel'

  Capybara.default_driver = :sauce

  # To work with sauce, capybara has to run with a recognised port
  # List of ports recognised by Sauce can be found at https://saucelabs.com/ruby
  Capybara.server_port = 49221

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

