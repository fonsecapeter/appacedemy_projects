# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  user_name       :string(255)      not null
#  password_digest :string(255)      not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_reader :password
  attr_reader :session_token

  validates :user_name, presence: true, uniqueness: true
  validates :password_digest, presence: { message: "Password can't be blank"}
  # validates :session_token, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  # before_validation :ensure_session_token

  has_many(
    :sessions,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'Session'
  )

  has_many(
    :cats,
    dependent: :destroy
  )

  has_many(
    :rental_requests,
    class_name: 'CatRentalRequest',
    dependent: :destroy
  )

  def self.find_by_credentials(user_name, password)
    user = User.find_by(user_name: user_name)

    # if we couldn't find the user by user_name
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def session_token
    @session_token ||= generate_session_token
  end

  def reset_session_token!
    @session_token = generate_session_token
  end

  def delete_session!
    session = Session.find_by(session_token: self.session_token)
    session.destroy!
    @session_token = nil
  end

  private

  def generate_session_token
    session = Session.new(
        user_id: self.id,
        session_token: SecureRandom.urlsafe_base64(16),
        environment: 'device' # request.env["HTTP_USER_AGENT"]
      )
    session.save!
    session.session_token
  end
end
