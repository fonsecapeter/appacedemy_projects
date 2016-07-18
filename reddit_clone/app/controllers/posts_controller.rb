
class PostsController < ApplicationController
  def index
    @posts = Post.all
  end


  def show
    @post = Post.find(params[:id])
    @comment = Comment.new
  end


  def create
    @subs = Sub.all
    @post = Post.new(post_params)
    debugger
    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end


  def new
    @post = Post.new
    @subs = Sub.all
  end

  def edit
    @post = Post.find(params[:id])
    @subs = Sub.all
  end


  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :edit
    end
  end

  private
  def post_params
    params.require(:post).permit(:title, :content, :url, sub_ids: [])
  end
end
