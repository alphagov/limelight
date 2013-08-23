class DashboardController < ApplicationController
  before_filter :validate_dashboard_existence

  def index
    respond_to do |format|
      format.html { render :template => "#{service_name}/index" }
    end
  end

  def validate_dashboard_existence
    redirect_to :status => 404 unless service_name
  end
end
