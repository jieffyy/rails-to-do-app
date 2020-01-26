Rails.application.routes.draw do
  root 'welcome#index'

  post 'login', to: 'users#create_session'
  get 'logout', to: 'users#delete_session'

  resources :users, only: [:index, :destroy, :create]
  post 'users/set_admin/:id', to: 'users#set_admin'

  resources :tasks, only: [:index, :create]
  
  get "*path", to: "welcome#index", constraints: { format: "html" }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
