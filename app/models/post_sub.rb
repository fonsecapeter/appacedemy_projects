class PostSub < ActiveRecord::Base
  belongs_to :post, inverse_of: :post_subs
  belongs_to :sub, inverse_of: :post_subs
  
  validates :sub_id, :post_id, presence: true
end
