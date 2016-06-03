class Comment < ActiveRecord::Base
  include Votable
  belongs_to :post

  belongs_to :parent_comment,
    primary_key: :id,
    foreign_key: :parent_comment_id,
    class_name: "Comment"

  belongs_to :author,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: "User"

  has_many :child_comments,
    primary_key: :id,
    foreign_key: :parent_comment_id,
    class_name: "Comment"
end
