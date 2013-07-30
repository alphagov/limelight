services = Hash.new

class Service
  attr_reader :name, :slug, :excluded_from_list

  def initialize(name, slug, excluded_from_list=false)
    @name = name
    @slug = slug
    @excluded_from_list = excluded_from_list
  end
end

services['licensing'] = Service.new('Licensing', 'licensing')

if Rails.application.config.feature_toggles[:evl_dashboard]
  services['electronic-vehicle-licensing'] = Service.new('Electronic Vehicle Licensing', 'electronic-vehicle-licensing')
end

if Rails.application.config.feature_toggles[:hmrc_dashboards]
  services['hmrc'] = Service.new('HMRC', 'hmrc', true)
end

if Rails.application.config.feature_toggles[:lpa_dashboard]
  services['lasting-power-of-attorney'] = Service.new('Lasting Power of Attorney', 'lasting-power-of-attorney')
end


if Rails.application.config.feature_toggles[:fco_dashboards]
  services['pay-legalisation-post'] = Service.new('Pay to get documents legalised by post', 'pay-legalisation-post')
  services['pay-legalisation-drop-off'] = Service.new('Pay to legalise documents using the premium service','pay-legalisation-drop-off')
  services['pay-register-birth-abroad'] = Service.new('Payment to register a birth abroad in the UK', 'pay-register-birth-abroad')
  services['pay-register-death-abroad'] = Service.new('Payment to register a death abroad', 'pay-register-death-abroad')
  services['pay-foreign-marriage-certificates'] = Service.new('Payment for certificates to get married abroad', 'pay-foreign-marriage-certificates')
  services['deposit-foreign-marriage'] = Service.new('Deposit foreign marriage or civil partnership certificates', 'deposit-foreign-marriage')
end

Limelight::Application.config.available_services = services