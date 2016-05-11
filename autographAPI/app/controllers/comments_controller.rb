class CommentsController < ApplicationController

  def index
    @comments = Comment.all.order(:created_at)
    render json: @comments.to_json, status: :ok
  end

  def create
    @car = Car.find(params[:car_id])
    @comment = @car.comments.build(comment_params)

    if @comment.save
      render json: @comment.to_json, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render json: @comment.to_json, status: :ok
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: {message: "success"}, status: :ok
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:author, :body, :car_id)
    end

end
