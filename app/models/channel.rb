class Channel < ApplicationRecord
  include ActiveModel::Model

  attr_accessor :name, :playlist_id, :video_id

  validates :name, presence: true

  validates :playlist_id, presence: true
end
