class Post < ActiveRecord::Base
  include Votable
  has_many :post_subs, inverse_of: :post

  belongs_to :author,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "User",
    inverse_of: :posts

  has_many :subs, through: :post_subs, source: :sub
  has_many :comments

  validate :has_atleast_one_sub

  def has_atleast_one_sub
    errors.add(:sub, "Must have at least one sub") if self.subs.length < 1
  end

  def parent_comments
    comments.where("parent_comment_id IS ?", nil)
  end
end
