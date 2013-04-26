# args.push('-r', './build/asset_data_url.rb');

# require 'base64'
# require 'rack/utils'
# require 'sass'

# module Sass::Script::Functions
  # def asset_data_url(string)
    # assert_type string, :String
    # Sass::Script::String.new(string.value.reverse)
    # 
    # asset  = environment.find_asset(path)
    # base64 = Base64.encode64(asset.to_s).gsub(/\s+/, "")
    # "data:#{asset.content_type};base64,#{Rack::Utils.escape(base64)}"
  # end
  # declare :reverse, :args => [:string]
# end
