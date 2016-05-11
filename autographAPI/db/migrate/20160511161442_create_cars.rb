class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :brand
      t.string :designation
      t.string :zip
      t.string :range

      t.timestamps null: false
    end
  end
end
