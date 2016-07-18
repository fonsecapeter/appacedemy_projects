require 'rspec'
require 'card'

describe Card do

  subject(:card) { Card.new(1, :spade) }

  describe "#initialize" do
    it "initializes a face" do
      expect(card.face).to eq(1)
    end

    it "initializes a suit" do
      expect(card.suit).to eq(:spade)
    end

    it "initializes a color" do
      expect(card.color).to eq(:black)
    end
  end

end 
