class TracksController < ApplicationController
  def new
    @track = Track.new
    render :new
  end

  def create
    @track = Track.new
    stash(Track.new(track_params), :new)
  end

  def edit
    @track = Track.find(params[:id])
  end

  def update
    @track = Track.new
    stash(Track.find(track_params), :edit)
  end

  def show
    @track = Track.find(params[:id])
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
  end

  private

  def stash(track, form)
    if track.save!
      redirect_to band_url(track.band)
      return
    else
      flash.now[:errors] = @track.errors.full_messages
      render form
      return
    end
  end

  def track_params
    self.params.require(:track).permit(:name, :bonus, :lyrics, :album_id)
  end

end
