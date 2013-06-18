module Settings
  def self.feature_toggles
    @feature_toggles ||= load_feature_toggles.to_hash
  end

  private
  def self.load_feature_toggles
    main_yaml_path = Rails.root.join("config", "environments", "feature_toggles.yml")
    override_yaml_path  = Rails.root.join("config", "environments", "feature_toggles_override.yml")

    toggles = FeatureToggles.new
    toggles.update_from_yaml_file(main_yaml_path)
    toggles.update_from_yaml_file(override_yaml_path) if File.exists? override_yaml_path


    toggles
  end
end
