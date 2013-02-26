Limelight::Application.routes.draw do
  root :to => 'root#index'
  match "/jasmine" => "root#jasmine"
end
