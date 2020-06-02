class UsersController < Devise::SessionsController
    before_action :remove_active_order
    respond_to :json

    def index
        if user_signed_in?
            respond_with User.find(params[:id])
        else
            redirect_to root_path
        end
    end
    def change_active_order
        begin
            if user_signed_in?
                current_user.active_order_id = params[:id]
                current_user.save!
            end
        rescue StandardError => e
            raise StandardError, e.message
        end
    end
    def remove_active_order
        begin
            if user_signed_in?
                @order = Order.find_by(order_id: current_user.active_order_id)
                if !@order or @order.status != 0
                    current_user.active_order_id = nil
                    current_user.save!
                end
            end
        rescue StandardError => e
            raise StandardError, e.message
        end
    end
    def all_users
        render :json => User.all
    end
    def make_admin
        begin
            @curr_user = User.find(params.permit(:id)[:id])
            @curr_user.role = 1
            @curr_user.save!
            render :json => User.all
        rescue StandardError => e
            raise StandardError, e.message
        end
    end
    def remove_admin
        begin
            @curr_user = User.find(params.permit(:id)[:id])
            @curr_user.role = 0
            @curr_user.save!
            render :json => User.all
        rescue StandardError => e
            raise StandardError, e.message
        end
    end
end
