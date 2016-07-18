require 'rspec'
require 'towers'

describe TowersOfHanoi do
  subject(:tower) { TowersOfHanoi.new(3) }

  describe "#initialize" do
    it "initializes to the correct size" do
      expect(tower.size).to be(3)
    end

    it "initializes tower[0]" do
      expect(tower[0].size).to eq(3)
    end
  end


  describe "#move" do
    it "moves a disc" do
      tower.move(0, 1)
      expect(tower[0].size).to eq(2)
      expect(tower[1].size).to eq(1)
    end

    it "doesn't let the user move a larger disc in top of a smaller disc" do
      tower.move(0, 1)
      expect{ tower.move(0, 1) }.to raise_error(StandardError)
    end
  end

  describe "#display" do
    it "exists" do
      expect{tower.display}.to_not raise_error
    end
  end

  describe "#over?" do
    it "knows when the game is over" do
      expect(tower.over?).to be_falsey
      tower.move(0, 1)
      tower.move(0, 2)
      tower.move(1, 2)
      tower.move(0, 1)
      tower.move(2, 0)
      tower.move(2, 1)
      tower.move(0, 1)
      expect(tower.over?).to be_truthy
    end

  end
end
