class ChangeBonusTrackToText < ActiveRecord::Migration
  def change
    change_column :tracks, :bonus, :text, null: false
  end
end
