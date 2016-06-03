class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.boolean :upvote
      t.timestamps null: false
      t.references :votable, polymorphic: true, index: true
    end
  end
end
