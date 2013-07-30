require 'spec_helper'

describe DashboardController do

  it 'should render existing dashboard template' do
    get :index, :dashboard => "electronic-vehicle-licensing"

    assert_response :ok
    response.should render_template("electronic-vehicle-licensing/index")
  end

  it 'should return 404 for non existent dashboard' do
    get :index, :dashboard => "non-existent"

    assert_response :not_found
  end
end