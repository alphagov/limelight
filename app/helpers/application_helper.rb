module ApplicationHelper

  def main_js_path
    if Rails.application.assets.find_asset("production.js").present?
      asset_path("production.js")
    else
      asset_path("config.js")
    end
  end

end
