class Api::ReportsController < ApplicationController

  #extend Meal 

  def index
    @reports = Report.all
    render "index.json.jbuilder"
  end 

  def show
    report_id = params[:id]
    @report = Report.find(report_id)
    render "show.json.jbuilder"
  end 
end
