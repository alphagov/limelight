class Service
  attr_reader :name, :slug, :excluded_from_list

  def initialize(service_config)
    @name = service_config["name"]
    @slug = service_config["slug"]
    @excluded_from_list = service_config["excluded_from_list"] || false
    @toggle = service_config["feature_toggle"]
  end

  def toggled_on?
    @toggle.nil? ? true : Rails.application.config.feature_toggles[@toggle.to_sym]
  end
end

services_yaml_path = Rails.root.join("config", "services.yml")

dashboards = YAML.load(File.read(services_yaml_path))["dashboards"]

services = dashboards.map {|properties| Service.new(properties)}.select(&:toggled_on?)

Limelight::Application.config.available_services = services.index_by(&:slug)