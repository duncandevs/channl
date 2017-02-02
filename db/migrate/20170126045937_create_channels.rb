class CreateChannels < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.string :name
      t.string :playlist_id
      add_column :video_id, :string
    end
  end
end
