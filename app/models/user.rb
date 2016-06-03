require 'bcrypt'
class User < ActiveRecord::Base
  # Associations
  has_many :posts, inverse_of: :author
  has_many :subs, inverse_of: :moderator

  attr_reader :password
  before_validation :ensure_session_token

  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  def self.find_by_credentials(email, password)
    user = User.find_by(:email => email)
    return nil if user.nil?
    return user if user.is_password?(password)
  end

  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest) == password
  end

  # Since this is only being called on a before_validation/after_initialization, so the user instance will already be saved, we just want to make sure that it has a session_token before that.
  def ensure_session_token
    self.session_token ||= self.generate_session_token
  end

  # We aren't calling this method on a callback (before_validation), so we aren't going to be explicitly saving this instance, hence we must call self.save!
  def reset_session_token!
    self.session_token = self.generate_session_token
    self.save!
    self.session_token
  end
end
