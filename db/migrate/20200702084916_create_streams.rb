class CreateStreams < ActiveRecord::Migration[5.2]
  def change
    create_table :streams do |t|
      t.integer :user_id, null: false
      t.boolean :live, :default => false
      t.timestamps
    end

  end
end
