namespace :rjs do
  task :compile do
    `cd app/assets/javascripts; node r.js -o build.js`
  end
end

Rake::Task["assets:precompile"].enhance(["rjs:compile"])
