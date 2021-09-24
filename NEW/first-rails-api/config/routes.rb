Rails.application.routes.draw do
  # devise_for :users
  namespace 'api' do
    namespace 'v1' do
      resources :posts
      as :user do
        post      'auth/signup',           to: 'users#create'
        post      'auth/login',           to: 'users#login'
      end
    end
  end
end
