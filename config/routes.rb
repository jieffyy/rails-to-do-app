Rails.application.routes.draw do
  root 'users#login'

  post 'login', to: 'users#create_session'
  get 'logout', to: 'users#delete_session'

  resources :tasks do
    resources :tags
  end
  
  resources :users
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
