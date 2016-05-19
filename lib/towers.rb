class TowersOfHanoi
  attr_reader :size
  def initialize(size)
    @size = size
    @tower = Array.new(3) { Array.new }
    build_tower
  end

  def [](tower)
    @tower[tower]
  end

  def move(start_pos, end_pos)
    unless @tower[end_pos].empty? || @tower[start_pos].empty?
      raise "Invalid move" if @tower[end_pos].last < @tower[start_pos].last
    end
    @tower[end_pos] << @tower[start_pos].pop
  end

  def display
    puts "hi! i'm a tower"
  end

  def over?
    @tower[1].size == @size || @tower[2].size == @size
  end

  private
  def build_tower
    @size.downto(1) do |disc|
      @tower[0] << disc
    end
  end

end
