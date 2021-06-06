# frozen_string_literal: true

# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  resources :users, only: [:create]
  post '/login', to: 'users#login', as: :login

  resources :tasks
  resources :tags
end
