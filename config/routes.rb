Rails.application.routes.draw do
  root 'users#login'

  get 'login', to: 'users#login'
  post 'login', to: 'users#create_session'
  post 'logout', to: 'users#delete_session'

  resources :tasks
  resources :users
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
