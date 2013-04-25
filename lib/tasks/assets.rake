namespace :rjs do
  desc "Compile javascripts with r.js"
  task :compile do
    system "cd app/assets/javascripts; node r.js -o build.js"
  end

  desc "Remove files compiled with r.js"
  task :clean do
    FileUtils.rm("app/assets/javascripts/production.js")
  end
end

Rake::Task["assets:precompile"].enhance(["rjs:compile"])
