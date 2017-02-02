Rails.application.routes.draw do
  root 'channels#index'
  get 'channel', to: 'channels#show'
  post 'channel', to: 'channels#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
