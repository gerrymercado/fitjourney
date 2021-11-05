class Api::UsersController < ApplicationController

  # before_action :authenticate_user

  skip_before_action :verify_authenticity_token

  def show
    if current_user
      @user = current_user
      render 'show.json.jbuilder'
    else  
      render json: {}
    end
  end 

  def create
    @user = User.new(
      id: params[:id],
      name: params[:name], 
      email: params[:email],
      password: params[:password], 
      password_confirmation: params[:password_confirmation],
      weight: params[:weight], 
      goals: params[:goals],
      favorite_activities: params[:favorite_activities]
      )
    if @user.save
      render "show.json.jbuilder"
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end 
  end 

  def edit
    user_id = params[:id]
    @user = User.find(user_id)
    @user.name = params[:name] || @user.name
    @user.email = params[:email] || @user.email
    @user.weight = params[:weight] || @user.weight
    @user.goals = params[:goals] || @user.goals
    @user.favorite_activities = params[:favorite_activities] || @user.favorite_activities

    if @user.save
      render "show.json.jbuilder"
    else 
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end 

  end 

  def update
    user_id = params[:id]
    @user = User.find(user_id)
    @user.name = params[:name] || @user.name
    @user.email = params[:email] || @user.email
    @user.weight = params[:weight] || @user.weight
    @user.goals = params[:goals] || @user.goals
    @user.favorite_activities = params[:favorite_activities] || @user.favorite_activities

    if @user.save
      render "show.json.jbuilder"
    else 
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end 
  end 

  def destroy
    user_id = params[:id]
    @user = User.find(user_id)
    @user.destroy
    render json: {message: "Account successfully deleted"}
  end 
end
