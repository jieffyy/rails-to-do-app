Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :tasks
  
  resources :users, only: [:create]
  post "/login", to: "users#login", as: :login
end
