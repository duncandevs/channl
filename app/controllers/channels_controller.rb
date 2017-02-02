class ChannelsController < ApplicationController
  def index
    @channel = Channel.new
  end

  def create
    @channel = Channel.new(channel_params)
  end
  def show
    redirect_to ''
  end
  private
  # security feature to prevent injections the would allow admin privelages
  # by only submitting the info designated by the field entries
  def channel_params
    params.require(:channel).permit(:name, :playlist_id, :video_id)
  end
end
