class Car < ActiveRecord::Base
  has_many :comments, dependent: :destroy
  after_destroy :reseed_if_no_more_cars

  private
  def reseed_if_no_more_cars
    if self.class.all.length == 0
      seeds = File.join(Rails.root, 'db', 'seeds.rb')
      load(seeds)
    end
  end
end
