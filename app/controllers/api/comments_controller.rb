class Api::CommentsController < ApplicationController

    def index
       
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.user_id = current_user.id
        if @comment.save
            # @comments = Comment.where(post_id: @comment.post_id)
            @post = Post.find(@comment.post_id)
            render '/api/posts/show'
            # render :show 
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def show
        @comments = Comment.where(post_id: params[:id])
        render :show
    end


    #when you click on the post, show all the posts comment

    def destroy
        @comment = Comment.find(params[:id])
        @post_id = @comment.post_id
        if @comment.destroy
            render :index
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    private 
    def comment_params
        params.require(:comment).permit(:body, :post_id)
    end

end
