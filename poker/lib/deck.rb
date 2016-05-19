require 'card'

class Deck

  attr_reader :cards
  def initialize
    @cards = []
    build_deck
  end

  def shuffle!
    @cards.shuffle!
  end

  def deal!
    if @cards.empty?
      raise "Deck is empty!"
    end
    @cards.pop
  end

  private

  def build_deck
    (1..13).each do |face|
      [:spade, :club, :heart, :diamond].each do |suit|
        @cards << Card.new(face, suit)
      end
    end
  end
end
