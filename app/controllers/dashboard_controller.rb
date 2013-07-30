class DashboardController < ApplicationController
  before_filter :validate_dashboard_existence

  @@dashboards = Set.new

  @@dashboards << "electronic-vehicle-licensing" if Rails.application.config.feature_toggles[:evl_dashboard]
  @@dashboards << "hmrc" if Rails.application.config.feature_toggles[:hmrc_dashboards]
  @@dashboards << "lasting-power-of-attorney" if Rails.application.config.feature_toggles[:lpa_dashboard]

  def index
    respond_to do |format|
      format.html { render :template => "#{params[:dashboard]}/index" }
    end
  end

  def validate_dashboard_existence
    redirect_to :status => 404 unless @@dashboards.include? params[:dashboard]
  end
end