module ServiceFetcher
  class << self
    def services
      Limelight::Application.config.available_services.values.reject(&:excluded_from_list)
    end

    def service_groups
      services.select { |s| s.is_group }.sort_by!(&:name)
    end

    def get_services_between(lower_bound, upper_bound)
      services.select { |s| not s.is_group }
        .sort_by(&:name)
        .group_by { |s| s.name[0].upcase }
        .select { |k, v| k >= lower_bound and k <= upper_bound }
    end 
  end
end
