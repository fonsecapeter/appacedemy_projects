class BandsController < ApplicationController
  def index
    @bands = Band.all
    render :index
  end

  def new
    @band = Band.new
    render :new
  end

  def create
    @band = Band.new
    stash(Band.new(band_params), :new)
  end

  def edit
    @band = Band.find(params[:id])
  end

  def update
    @band = Band.new
    stash(Band.find(band_params), :edit)
  end

  def show
    @band = Band.find(params[:id])
  end

  def destroy
    @band = Band.find(params[:id])
    @band.destroy
  end

  private

  def stash(band, form)
    if band.save
      redirect_to band_url(band, form)
      return
    else
      flash.now[:errors] = @band.errors.full_messages
      render form
      return
    end
  end

  def band_params
    self.params.require(:band).permit(:name)
  end

end
