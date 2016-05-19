class Card

  attr_reader :face, :suit, :color

  def initialize(face, suit)
    @face = face
    @suit = suit
    get_color
  end

  def <=>(other_card)
    @face <=> other_card.face
  end

  private

  def get_color
    if @suit == :spade || :club
      @color = :black
    else
      @color = :red
    end
  end
end
