Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'users'}
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    resources :products, only: [:index, :create, :update, :destroy]
    resources :orders, only: [:create, :update, :destroy]

    get 'products/:id' => 'products#get_item'
    post 'change_status' => 'orders#change_status'
  end

  devise_scope :user do
    get 'users/:id' => 'users#index', defaults: {format: 'json'}
    get 'users' => 'users#all_users', defaults: {format: 'json'}
    post 'make_admin' => 'users#make_admin', defaults: {format: 'json'}
    post 'remove_admin' => 'users#remove_admin', defaults: {format: 'json'}
    get 'change_active_order/:id' => 'users#change_active_order', defaults: {format: 'json'}
  end

  match '*path', to: 'pages#index', via: :all, constraints: lambda { |request|
    request.path.exclude? 'rails/active_storage'
  }
end