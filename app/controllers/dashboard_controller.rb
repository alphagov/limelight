class DashboardController < ApplicationController
  before_filter :validate_dashboard_existence

  def index
    respond_to do |format|
      format.html { render :template => "#{params[:dashboard]}/index" }
    end
  end

  def validate_dashboard_existence
    unless params[:dashboard] == "electronic-vehicle-licensing"
       redirect_to :status => 404
    end
  end
end