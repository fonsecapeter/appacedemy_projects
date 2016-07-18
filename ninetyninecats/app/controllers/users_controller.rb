class UsersController < ApplicationController
  def new
    @user = User.new()
    render :new
  end

  def create
    @user = User.new(user_name: user_params[:user_name], password: user_params[:password])
    unless user_params[:password] == user_params[:verify_password]
      flash.now[:errors] = @user.errors.full_messages
      render :new
      return
    end

    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:user_name, :password, :verify_password)
  end
end
