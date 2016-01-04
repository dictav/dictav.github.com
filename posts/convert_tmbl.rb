#! /usr/bin/env ruby
# coding:utf-8
require 'json'

list = []
Dir['tumblr_files/*'].each{|file|
  list.push *JSON.parse(File.read file)
}
puts list.size

format = <<FORMAT
---
layout: post
title: %{title}
date: %{date}
categories: %{tags}
---
%{body}
FORMAT

list.each do |a|
  if a['title'].empty?
    a['title'] = a['body'][0,8]
  end
  if a['tags']
    a['tags'] = a['tags'].join ' '
  end
  f_name = "#{a['date'][0,10]}-#{a['title'].gsub(/\s/,'+')}.markdown"
  File.open(f_name,'w'){|f| f.write( format % Hash[a.map{|(k,v)| [k.to_sym,v]}] ) } 
end
