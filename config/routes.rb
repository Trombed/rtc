Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :update, :show] 
    resource :session, only: [:create, :destroy]
    resources :streams, only: [:create, :index, :destroy]
    resources :channels, only: [:create, :show]
    resources :chats, only: [:create]
    resources :profile_pics, only: [:create]
  end

  root to: "static_pages#root"
  mount ActionCable.server, at: '/cable'
end
