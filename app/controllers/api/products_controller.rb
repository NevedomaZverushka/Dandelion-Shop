module API
    class ProductsController < ApplicationController
        def index
            render :json => Product.order(id: :ASC)
        end
        def create
            begin
                render :json => Product.create!(product_params)
            rescue StandardError => e
                raise StandardError, e.message
            end
        end
        def destroy
            begin
                @item = Product.find(params[:id])
                @item.destroy!
                render :json => Product.all
            rescue StandardError => e
                raise StandardError, e.message
            end
        end
        def update
            begin
                @item = Product.find(params[:id])
                @item.update!(product_params)
                render :json => Product.all
            rescue StandardError => e
                raise StandardError, e.message
            end
        end

        def get_item
            begin
                render :json => Product.find(params[:id])
            rescue StandardError => e
                raise StandardError, e.message
            end
        end

        private
            def product_params
                params.require(:product).permit(
                    :name,
                    :author,
                    :description,
                    :price,
                    :image
                )
            end
    end
end