class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.integer :weight
      t.string :goals
      t.string :favorite_activities

      t.timestamps
    end
  end
end
