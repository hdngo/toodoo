Rails.application.routes.draw do
  

# original paged app
  # get '/', to: 'tasks#index'
  # root 'tasks#index'

  ACCEPTS_JSON = lambda { |request| request.accepts.include?(:json)}

  scope constraints: ACCEPTS_JSON do
    resources :tasks do
      get :complete
    end
  end


  get '*path', to: 'client_app#show'
  root         to: 'client_app#show'

  
end
