class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.integer :user_id, null: false
      t.string :session_token, null: false
      t.string :environment, null: false

      t.timestamps null: false
    end

    add_index :sessions, :user_id

    remove_column :users, :session_token
  end
end
