class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    user = User.find_by_credentials(
      email: params[:user][:email],
      password: params[:user][:password]
    )

    if user
      login!(user)
      redirect_to root_url
      return
    else
      @user.errors.add(:password, "&/or email incorrect.")
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

  private

  def user_params
    self.params.require(:user).permit(:email, :password)
  end
end
