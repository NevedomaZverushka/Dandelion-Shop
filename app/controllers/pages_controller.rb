class PagesController < ApplicationController
  def index
    cookies[:id] = user_signed_in? ? current_user.id : nil
  end
end
