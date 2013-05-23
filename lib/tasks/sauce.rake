require 'cucumber/rake/task'
require 'parallel'


namespace :sauce do
  desc "Run all features against all browsers in parallel"
  task :cucumber => :environment do
    report_dir = "reports"
    FileUtils::mkdir_p(report_dir)
    
    path = Rails.root.join("config", "sauce_browser_matrix.json")
    @browsers = JSON.parse(IO.read(path))

    Parallel.map(@browsers, :in_threads => @browsers.size) do |browser|
      begin
        puts "Running with: #{browser.inspect}"

        ENV["BROWSER_NAME"] = browser[1]
        ENV["BROWSER_PLATFORM"] = browser[0]
        ENV["BROWSER_VERSION"] = browser[2]


        report_file = "#{browser.join('_').gsub(' ', '_')}.json"

        ENV["CUCUMBER_OPTS"] = [
          "--profile sauce",
          "--format json",
          "--out '#{report_dir}/#{report_file}'"
        ].join(' ')
        
        Rake::Task[ "sauce:run_browser_tests" ].execute

        puts "Success: #{browser.join('_')}"

      rescue Exception => e
        puts "Failed: #{browser.join('_')}"
      end
    end
  end

  Cucumber::Rake::Task.new(:'run_browser_tests')
end
