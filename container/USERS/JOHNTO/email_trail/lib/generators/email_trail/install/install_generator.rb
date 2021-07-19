require 'rails/generators/migration'

module EmailTrail
  module Generators
    class InstallGenerator < ::Rails::Generators::Base
      include Rails::Generators::Migration

      def self.source_root
        File.expand_path(File.join(File.dirname(__FILE__), 'templates'))
      end

      def self.next_migration_number(_path)
        Time.now.utc.strftime("%Y%m%d%H%M%S")
      end

      def create_model_file
        template 'email_trail.rb', 'app/models/email_trail.rb'
        migration_template 'create_email_trails.rb', 'db/migrate/create_email_trails.rb'
      end
    end
  end
end
