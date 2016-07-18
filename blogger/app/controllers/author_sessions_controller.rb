class AuthorSessionsController < ApplicationController
  def new
    # renders form
  end

  def create
    # accepts submission of form
    if login(params[:email], params[:password])
      redirect_back_or_to(articles_path, notice: 'Logged in successfully.')
    else
      flash.now.alert = "Login failed."
      render action: :new
    end
  end

  def destroy
    # removes record of logged-in user
    logout
    redirect_to(:authors, notice: 'Logged out!')
  end
end
