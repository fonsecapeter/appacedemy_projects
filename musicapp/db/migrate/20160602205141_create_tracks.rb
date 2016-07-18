class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :album_id, null: false
      t.text :name, null: false
      t.boolean :bonus, null:false, default: false
      t.text :lyrics, null: false

      t.timestamps null: false
    end

    add_index :tracks, :album_id

    add_column :albums, :title, :text, null: false
  end
end
