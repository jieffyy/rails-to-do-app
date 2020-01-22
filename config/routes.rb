Rails.application.routes.draw do
  root 'welcome#index'

  post 'login', to: 'users#create_session'
  get 'logout', to: 'users#delete_session'

  resources :users, only: [:index, :destroy]
  post 'users/set_admin/:id', to: 'users#set_admin'

  namespace :api do
    jsonapi_resources :tasks
  end
  
  get "*path", to: "welcome#index", constraints: { format: "html" }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
