class SessionsController < ApplicationController
  before_action :logged_in_user_redirect

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(
            session_params[:user_name],session_params[:password]
            )

    if @user.nil?
      @user = User.new(user_name: session_params[:user_name])
      flash.now[:errors] = "Incorrect username - password combination."
      render :new
    else
      login!(@user)
      redirect_to root_url
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end

  def logged_in_user_redirect
    if current_user && action_name == "new"
      redirect_to root_url
    end
  end

  private

  def session_params
    params.require(:user).permit(:user_name, :password)
  end
end
