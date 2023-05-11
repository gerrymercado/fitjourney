Rails.application.routes.draw do
  
post 'user_token' => 'user_token#create'
  
    namespace :api do
        
    get "/meals" => "meals#index"
    post "/meals" => "meals#create"
    get "/meals/:id" => "meals#show"
    patch "/meals/:id" => "meals#update"
    delete "/meals/:id" => "meals#destroy"

    get "/reports" => "reports#index"
    get "/reports/:id" => "reports#show"
    get "/reports/new" => "reports#new"
    post "/reports" => "reports#create"
    get "/reports" => "reports#edit"
    patch "/reports/:id" => "reports#update"
    delete "/reports/:id" => "reports#destroy"

    # get "/users/:id" => "users#show"
    get "/profile/:id" => "users#show"
    post "/users" => "users#create"
    get "/profile/:id" => "users#edit"
    patch "/profile/:id" => "users#update"
    delete "/profile/:id" => "users#destroy"
    end
end 
