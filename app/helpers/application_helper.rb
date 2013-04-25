module ApplicationHelper

  def main_js_path
    if Rails.env.prod?
      asset_path("production.js")
    else
      asset_path("config.js")
    end
  end

end
