class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :role, :active_order_id, :orders

  def orders
    set_id = []
    Order.where(user_id: object.id).map{ |order|
      if !set_id.include?(order.order_id)
        set_id.push(order.order_id)
        OrderSerializer.new(order)
      end
    }.compact
  end
end
