class TracksController < ApplicationController
  before_action :require_login

  def new
    @track = Track.new
    render :new
  end

  def create
    @track = Track.new
    track = Track.new(track_params)
    if track.save
      redirect_to track_url(track)
      return
    else
      flash.now[:errors] = @track.errors.full_messages
      render :new
    end
  end

  def edit
    @track = Track.find(params[:id])
  end

  def update
    @track = Track.find(params[:id])
    if @track.update(track_params)
      redirect_to track_url(@track)
      return
    else
      flash.now[:errors] = @track.errors.full_messages
      render :edit
    end
  end

  def show
    @track = Track.find(params[:id])
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
  end

  private

  def track_params
    self.params.require(:track).permit(:name, :bonus, :lyrics, :album_id)
  end

end
