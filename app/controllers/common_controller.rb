class CommonController < ApplicationController

  def services

    all_services = [
      {
        name: 'Licensing',
        path: licensing_path
      }
    ]

    if Rails.application.config.feature_toggles[:fco_dashboards]
      all_services += [
        {
          name: 'Pay to get documents legalised by post',
          path: dashboard_path("pay-legalisation-post")
        },
        {
          name: 'Pay to legalise documents using the premium service',
          path: dashboard_path("pay-legalisation-drop-off")
        },
        {
          name: 'Payment to register a birth abroad in the UK',
          path: dashboard_path("pay-register-birth-abroad")
        },
        {
          name: 'Payment to register a death abroad',
          path: dashboard_path("pay-register-death-abroad")
        },
        {
          name: 'Payment for certificates to get married abroad',
          path: dashboard_path("pay-foreign-marriage-certificates")
        },
        {
          name: 'Deposit foreign marriage or civil partnership certificates',
          path: dashboard_path("deposit-foreign-marriage")
        }
      ]
    end

    if Rails.application.config.feature_toggles[:lpa_dashboard]
      all_services << {
        name: 'Lasting Power of Attorney',
        path: dashboard_path("lasting-power-of-attorney")
      }
    end

    if Rails.application.config.feature_toggles[:evl_dashboard]
      all_services << {
          name: 'Electronic Vehicle Licensing',
          path: dashboard_path("electronic-vehicle-licensing")
      }
    end

    all_services.sort_by! { |k| k[:name] }

    @services = all_services.group_by{ |service| service[:name][0].downcase }
    @num_services = all_services.length

  end

end
