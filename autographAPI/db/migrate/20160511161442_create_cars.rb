class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :carMake
      t.string :carModel
      t.string :zipCode
      t.string :radius

      t.timestamps null: false
    end
  end
end
