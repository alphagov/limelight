require 'spec_helper'

describe ServiceFetcher do
  let(:pared_down_services) {
    [double(:some, {excluded_from_list: false, name: "Alfred", is_group: true}),
    double(:some, {excluded_from_list: false, name: "Xylophone", is_group: true}),
    double(:some, {excluded_from_list: false, name: "Broderick", is_group: false}),
    double(:some, {excluded_from_list: false, name: "Mountbatten", is_group: true})]
  }
  let(:services_list) {[double(:services, excluded_from_list: true)] + pared_down_services}
  before do
    Limelight::Application.stub_chain(:config, :available_services, :values).and_return services_list
  end
  describe ".services" do
    it "it should load services from the config minus excluded services" do
      subject.services.should == pared_down_services
    end
  end
  describe ".service_groups" do
    let(:ordered_names) {["Alfred", "Mountbatten", "Xylophone"]}
    it "should return only the service_groups in alphabetical order" do
      subject.service_groups.map(&:name).should == ordered_names
    end
  end

  describe "get_services_between" do
    let(:pared_down_services) {
      [
        double(:some, {excluded_from_list: false, name: "Alfred", is_group: false}),
        double(:some, {excluded_from_list: false, name: "Aberforth", is_group: false}),
        double(:some, {excluded_from_list: false, name: "Dorset", is_group: false}),
        double(:some, {excluded_from_list: false, name: "Dagenham", is_group: false}),
        double(:some, {excluded_from_list: false, name: "Eritrea", is_group: false}),
        double(:some, {excluded_from_list: false, name: "Exeter", is_group: false}),
        double(:some, {excluded_from_list: false, name: "Xylophone", is_group: false}),
        double(:some, {excluded_from_list: false, name: "Broderick", is_group: true}),
        double(:some, {excluded_from_list: false, name: "Cedric", is_group: true}),
        double(:some, {excluded_from_list: false, name: "Mountbatten", is_group: false})
      ]
    }
    let(:a_names) {["Aberforth", "Alfred"]}
    let(:d_names) {["Dagenham", "Dorset"]}
    let(:e_names) {["Eritrea", "Exeter"]}
    it "should receive services within bounds only, mapped to initial, in alphabetical order in group" do
      mapped_services = subject.get_services_between("A", "F")
      mapped_services.length.should == 3
      mapped_services["A"].map(&:name).should == a_names
      mapped_services["D"].map(&:name).should == d_names
      mapped_services["E"].map(&:name).should == e_names
    end
  end

end
