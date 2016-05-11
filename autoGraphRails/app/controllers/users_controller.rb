class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to "/home", notice: "Signed Up Successfully"
    else
      render :new
    end
  end

  def show
    @locations = User.find(current_user.id).locations
  end

  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, { placetype_ids: [] })
  end

end
