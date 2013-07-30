class DashboardController < ApplicationController
  before_filter :validate_dashboard_existence

  def index
    respond_to do |format|
      format.html { render :template => Limelight::Application.config.available_services[params[:slug]].view }
    end
  end

  def validate_dashboard_existence
    redirect_to :status => 404 unless Limelight::Application.config.available_services.key? params[:slug]
  end
end