module Votable
  extend ActiveSupport::Concern

  included do
    has_many :votes, as: :votable
  end

  def up_votes
    votes.where("upvote = ?", true)
  end

  def down_votes
    votes.where("upvote = ?", false)
  end
end
