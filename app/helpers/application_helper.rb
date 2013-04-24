module ApplicationHelper

  def assets_base_url
    asset_path("config.js").gsub(%r{/[^./]+.js}, "")
  end

  def main_js_path
    if Rails.env.prod?
      asset_path("production.js")
    else
      asset_path("config.js")
    end
  end

end
