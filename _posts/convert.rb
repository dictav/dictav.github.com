#! /usr/bin/env ruby
# coding:utf-8


text = File.read('dicdak.txt')
text.gsub!(%r,^date: (\d\d/\d\d/\d\d\d\d).+$,){|match|
  date = $1.split('/')
  dd = date[1]
  mm = date[0]
  yy = date[2]

  "date: #{yy}-#{mm}-#{dd}"
}

reg = /<PAGE_BREAK>/
posts = text.split(reg)


posts.each do |post|
  post.sub!(/^\n+/m, '')
  title = post.match(/^title: (.+)$/)[1]
  title.gsub!("/",'-')
  date = post.match(/^date: (.+)$/)[1]
  File.open("#{date}-#{title}.html",'w'){|f| f.write post}
end





