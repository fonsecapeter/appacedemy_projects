class BandsController < ApplicationController
  before_action :require_login, except: [:index]

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
    band = Band.new(band_params)
    if band.save
      redirect_to band_url(band)
      return
    else
      flash.now[:errors] = @band.errors.full_messages
      render :new
    end
  end

  def edit
    @band = Band.find(params[:id])
  end

  def update
    @band = Band.find(params[:id])
    if @band.update(band_params)
      redirect_to band_url(@band)
      return
    else
      flash.now[:errors] = @album.errors.full_messages
      render :edit
    end
  end

  def show
    @band = Band.find(params[:id])
  end

  def destroy
    @band = Band.find(params[:id])
    @band.destroy
  end

  private

  def band_params
    self.params.require(:band).permit(:name)
  end

end
