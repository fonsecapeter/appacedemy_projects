class Array

  def my_uniq
    elements = Hash.new
    self.each do |el|
      elements[el] = true
    end
    elements.keys
  end

  def two_sum
    sums = []
    self.each_with_index do |el1, idx1|
      (idx1..self.length - 1).each do |idx2|
        next if idx1 == idx2
        sums << [idx1, idx2] if el1 + self[idx2] == 0
      end
    end
    sums
  end

  def my_transpose
    return self if self.flatten.empty?
    transposed = Array.new(self[0].size) { Array.new(self.size) }
    self.each_with_index do |row, idx1|
      row.each_with_index do |el, idx2|
        transposed[idx2][idx1] = el
      end
    end
    transposed
  end

  def stock_picker
    profits = {}
    self.each_with_index do |el1, idx1|
      (idx1..self.length - 1).each do |idx2|
        next if idx1 == idx2
        difference = self[idx2] - el1
        profits[difference] = [idx1, idx2]
      end
    end

    max_profit = profits.keys.max
    profits[max_profit]
  end

end
