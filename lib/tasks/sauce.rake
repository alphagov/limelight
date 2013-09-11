namespace :sauce do
  desc "Run all features against all browsers in parallel"
  task :cucumber => :environment do
    
    require 'cucumber/rake/task'
    require 'parallel'

    if ENV["SAVE_REPORTS"]
      report_dir = "reports"
      FileUtils::mkdir_p(report_dir)
    end


    if ENV["RUN_SERVER"]
      Rake::Task[ "dev:rails:start" ].execute
    end
    
    path = Rails.root.join("config", "sauce_browser_matrix.json")
    @browsers = JSON.parse(IO.read(path))

    Parallel.map(@browsers, :in_threads => 1) do |browser|
      begin

        options = browser.pop if browser.length >= 4


        if ENV["SAVE_REPORTS"]
          report_file = "#{browser.join('_').gsub(' ', '_')}.json"
          format_options = "--format #{ENV["FORMAT"] || "json"} --out '#{report_dir}/#{report_file}'"
        else
          format_options = ""
        end
        
        ENV["CUCUMBER_OPTS"] = [
          "--profile sauce",
          format_options,
          options,
          "BROWSER='#{browser.join(',')}'"
        ].join(' ')
        
        Rake::Task[ "sauce:run_browser_tests" ].execute

        puts "Success: #{browser.join('_')}"

      rescue Exception => e
        puts "Failed: #{browser.join('_')}"
      end
    end

    if ENV["RUN_SERVER"]
      Rake::Task[ "dev:rails:stop" ].execute
    end
    
  end

  Cucumber::Rake::Task.new(:'run_browser_tests')
end