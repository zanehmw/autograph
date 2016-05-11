Rails.application.routes.draw do
  resources :cars
  resources :comments

  root to: redirect('/cars')
end
