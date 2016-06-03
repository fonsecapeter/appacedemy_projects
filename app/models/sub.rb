class Sub < ActiveRecord::Base
  validates :title, :description, :moderator, presence: true
  
  has_many :post_subs, inverse_of: :sub
  has_many :posts, through: :post_subs, source: :post

  belongs_to :moderator,
    primary_key: :id,
    foreign_key: :moderator_id,
    class_name: "User",
    inverse_of: :subs
end
