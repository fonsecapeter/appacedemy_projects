require_relative 'card'

class Hand
  HIERARCHY = {
    :royal_flush? => 9,
    :straight_flush? => 8,
    :four_of_a_kind? => 7,
    :full_house? => 6,
    :flush? => 5,
    :straight? => 4,
    :three_of_a_kind? => 3,
    :two_pair? => 2,
    :pair? => 1,
    :high_card => 0
  }

  attr_reader :cards

  def initialize
    @cards = []
  end

  def add_card(card)
    if cards.size >= 5
      raise "Hand is full!"
    end
    cards << card
  end

  def discard!(index)
    if cards.empty? ||
       index > 4 ||
       index < 0
      raise "Invalid discard!"
    end
    cards.delete_at(index)
  end

  def <=>(other_hand)
    case HIERARCHY[self.highest_hand] <=> HIERARCHY[other_hand.highest_hand]
    when -1
      return -1
    when 1
      return 1
    when 0
      self.high_card.face <=> other_hand.high_card.face
    end
  end

  def highest_hand
    HIERARCHY.keys.each do |key|
      return key if self.send(key)
    end
  end

  def high_card
    cards.max
  end

  def royal_flush?
    faces = @cards.map { |card| card.face }
    suits = @cards.map { |card| card.suit }

    if faces.sort == [1, 10, 11, 12, 13] &&
       suits.uniq.size == 1
      return true
    end
    false
  end

  def straight_flush?
    faces = @cards.map { |card| card.face }
    suits = @cards.map { |card| card.suit }

    faces.max - faces.min == 4 &&
      suits.uniq.size == 1 &&
      !self.four_of_a_kind? &&
      !self.three_of_a_kind? &&
      !self.two_pair? &&
      !self.pair?
  end

  def full_house?
    faces = @cards.map { |card| card.face }

    face_dups = Hash.new(0)
    faces.each do |face|
      face_dups[face] += 1
    end
    # remove the triplet to check for pair
    not_triples = face_dups.values.reject{ |val| val == 3 }

    self.three_of_a_kind? &&
      not_triples.first == 2 &&
      not_triples.length == 1
  end

  def flush?
    suits = @cards.map { |card| card.suit }
    suits.uniq.size == 1 &&
      !self.straight_flush?
  end

  def straight?
    faces = @cards.map { |card| card.face }

    faces.max - faces.min == 4 &&
      !self.four_of_a_kind? &&
      !self.three_of_a_kind? &&
      !self.two_pair? &&
      !self.pair? &&
      !self.straight_flush?
  end

  def four_of_a_kind?
    faces = @cards.map { |card| card.face }

    face_dups = Hash.new(0)
    faces.each do |face|
      face_dups[face] += 1
    end

    face_dups.values.select{ |val| val == 4 }.size == 1
  end

  def three_of_a_kind?
    faces = @cards.map { |card| card.face }

    face_dups = Hash.new(0)
    faces.each do |face|
      face_dups[face] += 1
    end

    face_dups.values.select{ |val| val == 3 }.size == 1
  end

  def two_pair?
    faces = @cards.map { |card| card.face }

    face_dups = Hash.new(0)
    faces.each do |face|
      face_dups[face] += 1
    end

    face_dups.values.select{ |val| val == 2 }.size == 2
  end

  def pair?
    faces = @cards.map { |card| card.face }

    face_dups = Hash.new(0)
    faces.each do |face|
      face_dups[face] += 1
    end

    face_dups.values.select{ |val| val == 2 }.size == 1
  end
end
