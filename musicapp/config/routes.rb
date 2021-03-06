Rails.application.routes.draw do
  resource :user, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  resources :bands
  resources :albums, :tracks, except: [:index]

  root to: 'bands#index'

end
