module API
    class OrdersController < ApplicationController
        def create
            begin
                if order_params[:order_id]
                    @orders = Order.order(order_id: :DESC).where(order_id: order_params[:order_id])
                    @orders.each do |order|
                        order.destroy!
                    end
                    order_params[:products].each do |product|
                        Order.create!({
                            order_id: order_params[:order_id],
                            user_id: order_params[:user_id],
                            status: order_params[:status],
                            product_id: product[:product_data][:id],
                            count: product[:count]
                        })
                    end
                    render :json => Order.find_by(order_id: order_params[:order_id])
                else
                    order_params[:products].each do |product|
                        Order.create!({
                            order_id: Order.maximum(:order_id) + 1,
                            user_id: order_params[:user_id],
                            status: order_params[:status],
                            product_id: product[:product_data][:id],
                            count: product[:count]
                        })
                    end
                    render :json => Order.find_by(order_id: Order.maximum(:order_id))
                end
            rescue StandardError => e
                raise StandardError, e.message
            end
        end
        def destroy
            begin
                Order.where(order_id: params[:id])&.each do |order|
                    order.destroy!
                end
            rescue StandardError => e
                raise StandardError, e.message
            end
        end
        def change_status
            begin
                Order.where(order_id: params.permit(:id)[:id])&.each do |item|
                    item.status = 1
                    item.save!
                end
                render :json => Order.where(order_id: params.permit(:id)[:id])
            rescue StandardError => e
                raise StandardError, e.message
            end
        end

        private
            def order_params
                params.require(:order).permit(
                    :order_id,
                    :user_id,
                    :status,
                    :created_at,
                    :products => [
                        :count, 
                        :product_data => [
                            :author, 
                            :description,
                            :id,
                            :image_url,
                            :name,
                            :price
                        ]
                    ]
                )
            end
    end
end