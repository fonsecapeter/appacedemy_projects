require 'array'
require 'rspec'

describe Array do
  subject(:array) { [1, 2, 2, 3] }

  describe "#my_uniq" do
    it "removes duplicates" do
      expect(array.my_uniq).to eq([1, 2, 3])
    end

    it "doesn't mutate original array" do
      expect(array.my_uniq).to_not be(array)
    end
  end

  describe "#two_sum" do

    context "when there's one zero-sum pair" do
      let(:array) { [1, 0, -1, 2] }

      it "returns the coordinates of the pair" do
        expect(array.two_sum).to eq([[0,2]])
      end
    end

    context "when there's two zero-sum pairs" do
      let(:array) { [1, 0, 3, -1, 2, -3] }

      it "returns the pairs in order" do
        expect(array.two_sum).to eq([[0, 3], [2, 5]])
      end
    end

    context "when there are no zero-sum pairs" do
      let(:array) { [-1, 0, -1, 2] }

      it "returns an empty array" do
        expect(array.two_sum).to be_empty
      end
    end
  end

  describe "#my_transpose" do
    context "when the matrix is square" do
      let(:matrix) { [[0, 1, 2],
                      [3, 4, 5],
                      [6, 7, 8]] }

      it "transposes the matrix" do
        expect(matrix.my_transpose).to eq([[0, 3, 6],
                                           [1, 4, 7],
                                           [2, 5, 8]])
      end

      it "doesn't mutate the orriginal matrix" do
        expect(matrix.my_transpose).to_not be(matrix)
      end
    end

    context "when the matrix is empty" do
      let(:matrix) { [[]] }
      it "returns the same matrix" do
        expect(matrix.my_transpose).to eq(matrix)
      end
    end

    context "when the matrix is rectangular" do
      let(:matrix) { [[0, 1, 2],
                      [6, 7, 8]] }
      it "transposes the matrix" do
        expect(matrix.my_transpose).to eq([[0, 6],
                                             [1, 7],
                                             [2, 8]])

      end
    end
  end

  describe "#stock_picker" do

    context "when there is one pair" do
      let(:stock_prices) { [2, 1, 3, 4, 3] }

      it "returns the pair's coordinates" do
        expect(stock_prices.stock_picker).to eq([1, 3])
      end
    end

    context "when there are multiples pairs" do
      let(:stock_prices) { [3, 1, 2, 1, 4, 2, 4] }
      it "picks the earliest pair" do
        expect(stock_prices.stock_picker).to eq([3, 6])
      end
    end

    context "when there are no best pairs" do
      let(:stock_prices) { [3, 3, 3, 3]}

      it "returns any pair" do
        expect(stock_prices.stock_picker).to be_an(Array)
        expect(stock_prices.stock_picker.size).to be(2)
      end
    end
  end
end
