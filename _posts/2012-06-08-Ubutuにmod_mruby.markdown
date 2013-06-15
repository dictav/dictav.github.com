---
layout: post
title: Ubutuにmod_mruby
date: 2012-06-08 11:17:01 GMT
tags: 
---
<p><a href="http://hwmemo01.tumblr.com/post/24670204725/ubutu-mod-mruby" class="tumblr_blog">hwmemo01</a>:</p>

<blockquote><p>手元の10.04でインストールする場合。</p>

<pre><code>apt-get install build-essential bison
git clone git://github.com/mruby/mruby.git /usr/local/src/mruby
cd /usr/local/src/mruby/
make CFLAGS="-g -O3 -fPIC"


apt-get install apache2 apache2-dev libjson0-dev
ln -s /usr/bin/apxs2 /usr/sbin/apxs
/usr/local/src/

git clone git://github.com/matsumoto-r/mod_mruby.git
cd mod_mruby/
make
</code></pre>

<p>mrubyのとき-fPICをつける。</p></blockquote>

<p></p>
