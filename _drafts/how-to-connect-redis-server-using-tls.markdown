---
layout: post
title: "How to connect Redis Server using TLS"
published: false
tags: redis tls ssl golang
---

#

Redis has no secure comunications by saying [security][] and [issue][]. So we have to implement by ownself.

# redis-ssl


# SSH tunnel 
Using ssh tunnel is the easist.

```
$ ssh -L 12345:localhost:6379 foo@redis.server
```

```
$ redis-cli -h redis.server -p 12345
```

or use [stunnel][]

# Implement SSL proxy with Go


---

# はじめに
Redis はその思想から SSL を使うようなセキュアプロトコルをサポートしていません。なんらかの理由でセキュアに通信を行いたい場合、自分で機能を実装する必要があります。
Redisには認証機能もとてもベーシックなものしか用意していないので、そもそもセキュアに通信したいという用件がある場合には、本当にRedisを使わなければいけないのか十分に考える方が良いでしょう。

# redis-ssl
RedisをSSLと組み合わせて使いたいという用件は昔からあるため、redis の fork が存在する [redis-ssl][]。ただ、2.4ベースのため古く、バグも残っているかもしれない。Redisがまだ成長を続けているプロダクトであるので、できるだけ新しいバージョンを使った方が良い。

# SSH tunnel
SSHトンネルを使用するのが一番簡単かな。

```
$ ssh -L 12345:localhost:6379 foo@redis.server
```

```
$ redis-cli -h redis.server -p 12345
```

こういうことをするための専用のソフトウェアに[stunnel][]というのもある。

[security]: http://redis.io/topics/security
[issue]: https://code.google.com/p/redis/issues/detail?id=71
[redis-ssl]: https://github.com/bbroerman30/ssl-redis
[stunnel]: http://www.stunnel.org/


