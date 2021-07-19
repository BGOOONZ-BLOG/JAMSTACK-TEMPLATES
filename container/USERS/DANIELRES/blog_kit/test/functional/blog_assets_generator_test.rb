# require File.dirname(__FILE__) + '/../test_helper.rb'
# require 'rails_generator'
# require 'rails_generator/scripts/generate'
# 
# class BlogAssetsGeneratorTest < Test::Unit::TestCase
#   def setup
#     FileUtils.mkdir_p(fake_rails_root)
#     FileUtils.mkdir_p(fake_rails_root + '/config')
#     FileUtils.mkdir_p(fake_rails_root + '/public/stylesheets')
#     @original_files = file_list
#   end
# 
#   def teardown
#     ActiveRecord::Base.pluralize_table_names = true
#     FileUtils.rm_r(fake_rails_root)
#   end
# 
#   def test_generates_correct_file_name
#     Rails::Generator::Scripts::Generate.new.run(["blog_assets"],
#       :destination => fake_rails_root)
#     new_files = (file_list - @original_files)
#     assert_includes /create_blog_comments/, new_files
#     assert_includes /create_blog_posts/, new_files
# 		assert_includes /blog_kit.yml/, new_files
#   end
# 
#   private
#     def fake_rails_root
#       File.join(File.dirname(__FILE__), 'rails_root')
#     end
# 
#     def file_list
#       Dir.glob(File.join(fake_rails_root, "db", "migrate", "*")) + 
#       Dir.glob(File.join(fake_rails_root, "config", "*"))
#     end
# 
# end