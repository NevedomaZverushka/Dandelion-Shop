class OrderSerializer < ActiveModel::Serializer
  attributes :order_id, :user_id, :products, :status, :created_at

  def products
    orders_by_id = Order.where(order_id: object.order_id)
    orders_by_id&.map{ |order|
      product = Product.find_by(id: order.product_id)
      if product
        { count: order.count, product_data: ProductSerializer.new(product) }
      else
        nil
      end
    }.compact
  end

end
