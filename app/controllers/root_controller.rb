class RootController < ApplicationController

  def index
    @services = Limelight::Application.config.available_services.values.reject(&:excluded_from_list)

    col1 = get_services_between('A', 'O')
    col2 = get_services_between('P', 'P')
    col3 = get_services_between('Q', 'Z')

    col3['Service Groups'] = @services.select { |s| s.is_group }.sort_by!(&:name)

    @columns = [col1, col2, col3]
  end

  private

  def get_services_between(lower_bound, upper_bound)
    @services.select { |s| not s.is_group }
      .sort_by(&:name)
      .group_by { |s| s.name[0].upcase }
      .select { |k, v| k >= lower_bound and k <= upper_bound }
  end

end
