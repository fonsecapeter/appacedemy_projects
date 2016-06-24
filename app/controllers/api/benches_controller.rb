class Api::BenchesController < ApplicationController
  def index
    @benches = Bench.all
    render json: @benches
  end

  def create
    @bench = Bench.new(bench_params)
    if @bench.save!
      render json: @bench
    else
      flash.now[:errors] = @bench.errors.full_messages
      render json: @bench
    end
  end

  private

  def bench_params
    params.require(:bench).permit(:lat, :lon, :description)
  end
end
