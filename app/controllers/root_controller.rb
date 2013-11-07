require 'service_fetcher'

class RootController < ApplicationController

  def index

    col1 = get_services_between('A', 'O')
    col2 = get_services_between('P', 'P')
    col3 = get_services_between('Q', 'Z')

    col3['Service groups'] = get_service_groups

    @columns = [col1, col2, col3]
  end

  private

  def get_services_between(lower_bound, upper_bound)
    ServiceFetcher.get_services_between(lower_bound, upper_bound)
  end

  def get_service_groups
    ServiceFetcher.service_groups
  end

end
