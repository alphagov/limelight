class DashboardController < ApplicationController
  before_filter :validate_dashboard_existence

  @@dashboards = Hash.new

  @@dashboards["electronic-vehicle-licensing"] = "electronic-vehicle-licensing/index" if Rails.application.config.feature_toggles[:evl_dashboard]
  @@dashboards["hmrc"                        ] = "hmrc/index" if Rails.application.config.feature_toggles[:hmrc_dashboards]
  @@dashboards["lasting-power-of-attorney"   ] = "lasting-power-of-attorney/index" if Rails.application.config.feature_toggles[:lpa_dashboard]

  if Rails.application.config.feature_toggles[:fco_dashboards]
    @@dashboards["pay-legalisation-post"] = "foreign-commonwealth-office/pay-legalisation-post"
    @@dashboards["pay-legalisation-drop-off"] = "foreign-commonwealth-office/pay-legalisation-drop-off"
    @@dashboards["pay-register-birth-abroad"] = "foreign-commonwealth-office/pay-register-birth-abroad"
    @@dashboards["pay-register-death-abroad"] = "foreign-commonwealth-office/pay-register-death-abroad"
    @@dashboards["pay-foreign-marriage-certificates"] = "foreign-commonwealth-office/pay-foreign-marriage-certificates"
    @@dashboards["deposit-foreign-marriage"] = "foreign-commonwealth-office/deposit-foreign-marriage"
  end

  def index
    respond_to do |format|
      format.html { render :template => @@dashboards[params[:dashboard]] }
    end
  end

  def validate_dashboard_existence
    redirect_to :status => 404 unless @@dashboards.key? params[:dashboard]
  end
end