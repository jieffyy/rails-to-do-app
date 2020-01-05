Rails.application.routes.draw do
  root 'users#login'

  post 'login', to: 'users#create_session'
  get 'logout', to: 'users#delete_session'

  resources :tasks, except: [:index, :new] do
    resource :tags, only: [:create]
  end
  delete '/tasks/:task_id/tags/:tag_name', to: 'tags#destroy'
  
  resources :users
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
