class ApplicationController < ActionController::Base
  helper_method :current_user
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    return nil if self.session[:session_token].nil?
    userid = Session.find_by(session_token: session[:session_token]).user_id
    @user ||= User.find(userid)
  end

  def login!(user)
    user.reset_session_token!
    self.session[:session_token] = user.session_token
  end

  def logout!
    current_user.delete_session! if current_user
    self.session[:session_token] = nil
  end

end
