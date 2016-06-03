class PostSub < ActiveRecord::Base
  # We sue inverse_of when we are not validating the presence of an id (column); instead, just validate the presence of an association
  belongs_to :post, inverse_of: :post_subs
  belongs_to :sub, inverse_of: :post_subs

  validates :sub, :post, presence: true
end
