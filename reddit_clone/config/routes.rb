Rails.application.routes.draw do
  resource :session
  resources :users
  resources :posts do
    resources :comments, only: [:new, :show]
  end
  resources :subs

  resources :comments, only: [:create]
end
