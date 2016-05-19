require 'rspec'
require 'hand'
require 'card'

describe Hand do
  subject(:hand) { Hand.new }
  let(:other_hand) { Hand.new }
  let(:a) { double('card', face: 1, suit: :diamond) }
  let(:k) { double('card', face: 13, suit: :diamond) }
  let(:q) { double('card', face: 12, suit: :diamond) }
  let(:j) { double('card', face: 11, suit: :diamond) }
  let(:ten) { double('card', face: 10, suit: :diamond) }
  let(:nine) { double('card', face: 9, suit: :diamond) }
  let(:eight) { double('card', face: 8, suit: :diamond) }
  let(:seven) { double('card', face: 7, suit: :diamond) }
  let(:six) { double('card', face: 6, suit: :diamond) }
  let(:five) { double('card', face: 5, suit: :diamond) }
  let(:four) { double('card', face: 4, suit: :diamond) }
  let(:three) { double('card', face: 3, suit: :diamond) }
  let(:two) { double('card', face: 2, suit: :diamond) }

  let(:nine_h) { double('card', face: 9, suit: :heart) }
  let(:nine_c) { double('card', face: 9, suit: :club) }
  let(:nine_s) { double('card', face: 9, suit: :spade) }

  let(:ten_h) { double('card', face: 10, suit: :heart) }

  describe "#initialize" do
    it "should start empty" do
      expect(hand.cards).to be_empty
    end
  end

  describe "#add_card" do
    before(:each) { hand.add_card(five) }

    it "adds a card to the hand" do
      expect(hand.cards.last).to be(five)
    end

    it "will not take more than five cards" do
      expect{ 5.times { hand.add_card(five) }}.to raise_error(StandardError)
    end
  end

  describe "#discard!" do
    before(:each) {
      hand.add_card(five)
      hand.add_card(six)
      hand.add_card(k)
      hand.add_card(two)
      hand.add_card(j)
    }

    it "discards the correct card" do
      expect(hand.discard!(0)).to be(five)
      expect(hand.cards).to_not include(five)
      expect(hand.cards.length).to be(4)
    end

    it "will not discard from an empty hand" do
      expect{ 6.times {hand.discard!(0)}}.to raise_error(StandardError)
    end

    it "discards a valid card" do
      expect{ hand.discard!(5)}.to raise_error(StandardError)
      expect{ hand.discard!(-1)}.to raise_error(StandardError)
    end
  end

  describe "#royal_flush?" do
    before(:each) {
      hand.add_card(a)
      hand.add_card(k)
      hand.add_card(q)
      hand.add_card(j)
      hand.add_card(ten)
    }

    it "detects a royal flush" do
      expect(hand.royal_flush?).to be_truthy
      hand.discard!(0)
      hand.add_card(five)
      expect(hand.royal_flush?).to be_falsey
    end
  end

  describe "#straight_flush?" do
    before(:each) {
      hand.add_card(nine)
      hand.add_card(eight)
      hand.add_card(seven)
      hand.add_card(six)
      hand.add_card(five)
    }

    it "detects a straight flush" do
      expect(hand.straight_flush?).to be_truthy
      hand.discard!(0)
      hand.add_card(three)
      expect(hand.straight_flush?).to be_falsey
    end
  end

  describe "#four_of_a_kind?" do
    before(:each) {
      hand.add_card(nine)
      hand.add_card(nine_h)
      hand.add_card(nine_c)
      hand.add_card(nine_s)
      hand.add_card(two)
    }

    it "detects a four of a kind" do
      expect(hand.four_of_a_kind?).to be_truthy
      hand.discard!(0)
      hand.add_card(three)
      expect(hand.four_of_a_kind?).to be_falsey
    end
  end

  describe "#full_house?" do
    before(:each) {
      hand.add_card(ten)
      hand.add_card(nine_h)
      hand.add_card(nine_c)
      hand.add_card(nine_s)
      hand.add_card(ten_h)
    }

    it "detects a full house" do
      expect(hand.full_house?).to be_truthy
      hand.discard!(0)
      hand.add_card(three)
      expect(hand.full_house?).to be_falsey
    end
  end

  describe "#flush?" do
    before(:each) {
      hand.add_card(four)
      hand.add_card(j)
      hand.add_card(eight)
      hand.add_card(two)
      hand.add_card(nine)
    }

    it "detects a flush" do
      expect(hand.flush?).to be_truthy
      hand.discard!(0)
      hand.add_card(nine_h)
      expect(hand.flush?).to be_falsey
    end
  end

  describe "#straight?" do
    before(:each) do
      hand.add_card(nine_s)
      hand.add_card(eight)
      hand.add_card(seven)
      hand.add_card(six)
      hand.add_card(five)
    end

    it "detects a straight" do
      expect(hand.straight?).to be_truthy
      hand.discard!(0)
      hand.add_card(three)
      expect(hand.straight?).to be_falsey
    end
  end

  describe "#three_of_a_kind?" do
    before(:each) {
      hand.add_card(nine_h)
      hand.add_card(j)
      hand.add_card(nine_s)
      hand.add_card(two)
      hand.add_card(nine)
    }

    it "detects a three of a kind" do
      expect(hand.three_of_a_kind?).to be_truthy
      hand.discard!(0)
      hand.add_card(three)
      expect(hand.three_of_a_kind?).to be_falsey
    end
  end

  describe "#two_pair?" do
    before(:each) {
      hand.add_card(nine_h)
      hand.add_card(ten)
      hand.add_card(nine_s)
      hand.add_card(two)
      hand.add_card(ten_h)
    }

    it "detects a two pair" do
      expect(hand.two_pair?).to be_truthy
      hand.discard!(0)
      hand.add_card(three)
      expect(hand.two_pair?).to be_falsey
    end
  end

  describe "#pair?" do
    before(:each) {
      hand.add_card(nine_h)
      hand.add_card(ten)
      hand.add_card(nine_s)
      hand.add_card(two)
      hand.add_card(five)
    }

    it "detects a pair" do
      expect(hand.pair?).to be_truthy
      hand.discard!(0)
      hand.add_card(three)
      expect(hand.pair?).to be_falsey
    end
  end

  describe "#high_card" do
    before(:each) {
      hand.add_card(Card.new(10, :heart))
      hand.add_card(Card.new(9, :diamond))
      hand.add_card(Card.new(8, :diamond))
      hand.add_card(Card.new(2, :club))
      hand.add_card(Card.new(5, :spade))
    }

    it "detects a high card" do
      expect(hand.high_card.face).to be(10)
      hand.discard!(0)
      hand.add_card(Card.new(3, :diamond))
      expect(hand.high_card.face).to be(9)
    end
  end

  describe "#<=>" do
    before(:each) do
      hand.add_card(nine_h)
      hand.add_card(ten)
      hand.add_card(nine_s)
      hand.add_card(two)
      hand.add_card(ten_h)
    end

    it "adheres to the hierarchy" do
      other_hand.add_card(four)
      other_hand.add_card(j)
      other_hand.add_card(eight)
      other_hand.add_card(two)
      other_hand.add_card(nine)

      expect(hand <=> other_hand).to be(-1)
    end

    it "reverts to high card in a draw" do
      other_hand.add_card(nine_h)
      other_hand.add_card(j)
      other_hand.add_card(nine_s)
      other_hand.add_card(two)
      other_hand.add_card(ten_h)

      expect(hand <=> other_hand).to be(1)
    end

    it "reverts to suit in a high card draw"
  end
end
