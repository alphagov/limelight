module ApplicationHelper

  def assets_base_url
    asset_path("config.js").gsub(%r{/[^./]+.js}, "")
  end

end
