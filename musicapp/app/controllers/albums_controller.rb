class AlbumsController < ApplicationController
  before_action :require_login

  def new
    @album = Album.new
    render :new
  end

  def create
    @album = Album.new
    album = Album.new(album_params)
    if album.save
      redirect_to album_url(album)
      return
    else
      flash.now[:errors] = @album.errors.full_messages
      render :new
    end
  end

  def edit
    @album = Album.find(params[:id])
  end

  def update
    @album = Album.find(params[:id])
    if @album.update(album_params)
      redirect_to album_url(@album)
      return
    else
      flash.now[:errors] = @album.errors.full_messages
      render :edit
    end
  end

  def show
    @album = Album.find(params[:id])
  end

  def destroy
    @album = Album.find(params[:id])
    @album.destroy
  end

  private

  def album_params
    self.params.require(:album).permit(:title, :band_id, :recording)
  end

end
