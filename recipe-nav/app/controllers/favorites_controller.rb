class FavoritesController < ApplicationController
  before_action :logged_in_user
  def show
    @user = current_user
    @favorites = current_user.favorites
  end
end
