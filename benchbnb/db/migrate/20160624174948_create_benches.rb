class CreateBenches < ActiveRecord::Migration
  def change
    create_table :benches do |t|
      t.float :lat, null: false
      t.float :lon, null: false
      t.text :description

      t.timestamps null: false
    end

    add_index :benches, :lat
    add_index :benches, :lon
  end
end
