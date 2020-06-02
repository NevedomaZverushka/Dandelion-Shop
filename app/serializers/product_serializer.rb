class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :author, :image_url

  def image_url
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
    else
      nil
    end
  end
end
