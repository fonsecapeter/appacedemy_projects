class SubsController < ApplicationController
  def new
    @sub = Sub.new
  end

  def index
    @subs = Sub.all
  end
  def show
    @sub = Sub.find(params[:id])
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.moderator_id = current_user.id
    if @sub.save
      redirect_to subs_url
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  def edit
    @sub = Sub.find(params[:id])
  end

  def update

  end

  private
  def sub_params
    params.require(:sub).permit(:title, :description)
  end
end
