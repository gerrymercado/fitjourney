class Api::MealsController < ApplicationController

  before_action :authenticate_user

  def index
    @meals = current_user.meals 

    meal_category_search = params[:search]

    if meal_category_search
      @meals = Meal.where("meal_category LIKE ?", "%#{meal_category_search}%")
    end 
    render "index.json.jbuilder"
  end 

  def show
    meal_id = params[:id]
    @meal = Meal.find(meal_id)
    render "show.json.jbuilder"
  end 

  def create
    @meal = Meal.new(
      user_id: current_user.id,
      name: params[:name], 
      meal_category: params[:meal_category], 
      calories: params[:calories],
      protein: params[:protein], 
      fat: params[:fat], 
      carbs: params[:carbs],
      upc_code: params[:upc_code]
      )

    if @meal.save
      render "show.json.jbuilder"
    else 
      render json: {errors: @meal.errors.full_messages}, status: :unprocessable_entity
    end 
  end 

  def destroy
    meal_id = params[:id]
    @meal = Meal.find(meal_id)
    @meal.destroy

    render json: {message: "Meal successfully deleted"}
  end 

end
