namespace :jasmine do

  desc "Start Jasmine with Blanket JS support"
  task :blanketjs do
    ENV['COVERAGE'] = "true"
    Rake::Task['jasmine'].invoke
  end
end
