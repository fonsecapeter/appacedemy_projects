class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def log_in!(user)
    # @current_user = user
    self.session[:session_token] = user.reset_session_token!
  end

  def log_out!
    self.session[:session_token] = nil
  end

  def current_user
    return nil if self.session[:session_token].nil?
    @user = User.find_by(:session_token => self.session[:session_token])
  end

end
