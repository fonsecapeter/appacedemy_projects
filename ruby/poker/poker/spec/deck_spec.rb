require 'rspec'
require 'deck'

describe Deck do
  subject(:deck) { Deck.new }
  let(:other_deck) { Deck.new }

  describe "#initialize" do
    it "generates an array of 52 cards" do
      expect(deck.cards.size).to eq(52)
    end

    it "contains 4 cards of each face" do
      aces = deck.cards.select { |card| card.face == 1 }
      expect(aces.size).to eq(4)
    end

    it "doesn't duplicate suits" do
      fours = deck.cards.select { |card| card.face == 4 }
      fours_suits = fours.map { |card| card.suit }
      expect(fours_suits.uniq.size).to eq(4)
    end
  end

  describe "#shuffle!" do
    before(:each) { deck.shuffle! }

    it "preserves cards" do

      expect(deck.cards.sort).to eq(other_deck.cards.sort)
    end

    it "changes the order of the cards" do
      expect(deck.cards).to_not eq(other_deck.cards)
    end
  end

  describe "#deal!" do

    it "returns a card"  do
      expect(deck.deal!).to be_a(Card)
    end

    it "only takes from the top of the deck" do
      expect(deck.deal!).to eq(other_deck.cards.last)
    end

    it "will not deal from an empty deck" do
      expect{ 53.times { deck.deal! }}.to raise_error(StandardError)
    end
  end
end
