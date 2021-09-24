require "sinatra"
require "uri"

def page_content(title)
  File.read("pages/#{title}.txt")
rescue Errno::ENOENT
  return nil
end

def save_content(title, content)
  File.open("pages/#{title}.txt", "w") do |file|
    file.print(content)
  end
end

def delete_content(title)
  File.delete("pages/#{title}.txt")
end

get "/" do
  erb :welcome
end

get "/new" do
  erb :new
end

get "/:title" do
  @title = params[:title]
  @content = page_content(@title)
  erb :character
end

get "/edit/:title" do
  @title = params['title']
  @content = page_content(@title)
  erb :edit
end

post "/create" do
  title = params[:title]
  content = params[:content]
  save_content(title, content)
  redirect URI.escape("/#{title}")
end

put "/:title" do
  title = params[:title]
  content = params[:content]
  save_content(title, content)
  redirect URI.escape("/#{title}")
end

delete "/:title" do
  title = params[:title]
  delete_content(title)
  redirect "/"
end