class FixtureLoader
  def initialize(path_to_fixture_dir)
    @path = path_to_fixture_dir
  end

  def load(file_name)
    JSON.parse(File.read(dir_path() + file_name))
  end

  private
  def dir_path
    path = @path
    unless path.end_with?('/')
      path = path + '/'
    end
    path
  end
end
