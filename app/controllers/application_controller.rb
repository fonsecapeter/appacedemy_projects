class ApplicationController < ActionController::Base
  helper_method :current_user, :require_login
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    return nil if self.session[:session_token].nil?
    @user ||= User.find_by(session_token: self.session[:session_token])
  end

  def login!(user)
    user.reset_session_token!
    self.session[:session_token] = user.session_token
  end

  def logout!
    self.session[:session_token] = nil
  end

  def require_login
    unless current_user
      redirect_to new_session_url
    end
  end
end
