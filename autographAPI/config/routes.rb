Rails.application.routes.draw do
  resources :cars do
    resources :comments
  end
  root to: redirect('/cars')
end
