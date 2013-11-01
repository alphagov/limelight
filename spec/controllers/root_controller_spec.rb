require 'spec_helper'

describe RootController do
  describe "#index" do
    let(:service_groups) {[double(:a_service_group)]}
    let(:column_one) {{"D" => [double(:some_result)]}}
    let(:column_two) {{"M" => [double(:other_result)]}}
    let(:column_three) {{"Z" => [double(:different_result)], 'Service Groups' => service_groups}}
    before do
    end
    it "should assign the correct columns - alphabetically and with service groups in the last column" do
      ServiceFetcher.should_receive(:service_groups).and_return service_groups
      ServiceFetcher.should_receive(:get_services_between).with('A', 'O').and_return column_one 
      ServiceFetcher.should_receive(:get_services_between).with('P', 'P').and_return column_two
      ServiceFetcher.should_receive(:get_services_between).with('Q', 'Z').and_return column_three
      get :index
      assigns(:columns)[0].should == column_one
      assigns(:columns)[1].should == column_two
      assigns(:columns)[2].should == column_three
    end
  end
end
