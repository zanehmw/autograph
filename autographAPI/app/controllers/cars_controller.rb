class CarsController < ApplicationController
  def index
    @cars = Car.all.order(:created_at)
    render json: @cars.to_json(:include => [:comments]), status: :ok
  end

  def show
    @car = Car.find(params[:id])
    render json: @car.to_json(:include => [:comments]), status: :ok
  end

  def create
    @car = Car.new(car_params)
    if @car.save
      render json: @car.to_json, status: :created
    else
      render json: @car.errors, status: :unprocessable_entity
    end
  end

  def update
    @car = Car.find(params[:id])
    if @car.update(car_params)
      render json: @car.to_json, status: :ok
    else
      render json: @car.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @car = Car.find(params[:id])
    @car.destroy
    render json: {message: "success"}, status: :ok
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def car_params
      params.require(:car).permit(:carMake, :carModel, :zipCode, :radius)
    end
end
