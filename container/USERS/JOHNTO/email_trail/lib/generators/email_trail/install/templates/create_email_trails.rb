class CreateEmailTrails < ActiveRecord::Migration
  def self.up
    create_table :email_trails do |t|
      t.text :to
      t.text :cc
      t.text :bcc
      t.text :from
      t.text :subject
      t.text :body
      t.timestamps
    end

    add_index :email_trails, :to
  end

  def self.down
    drop_table :email_trails
  end
end
