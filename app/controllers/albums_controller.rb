class AlbumsController < ApplicationController
  def new
    @album = Album.new
    render :new
  end

  def create
    @album = Album.new
    stash(Album.new(album_params), :new)
  end

  def edit
    @album = Album.find(params[:id])
  end

  def update
    @album = Album.new
    stash(Album.find(album_params), :edit)
  end

  def show
    @album = Album.find(params[:id])
  end

  def destroy
    @album = Album.find(params[:id])
    @album.destroy
  end

  private

  def stash(album, form)
    if album.save!
      redirect_to band_url(album.band_id)
      return
    else
      flash.now[:errors] = @album.errors.full_messages
      render form
      return
    end
  end

  def album_params
    self.params.require(:album).permit(:title, :band_id, :recording)
  end

end
