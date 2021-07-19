# email

An email microservice to send yourself an email.
I often use this to track cron job or long running script failures on random machines.

TODO - Add some type of auth key so randos can't email you if they figure out the url

#### installation

```sh
ghclone johnotander/email && cd $_
go get ./
go build && ./email
```

#### usage

```sh
func failed() {
  curl \
    -H "Content-Type: application/json" \
    -X POST \
    -d '{"title": "Oh no!","body": "My cron job failed"}' \
    http://foo.bar
}

command || failed
```

##### .env

This uses AWS SES and requires the following environment variables

```sh
AWS_ACCESS_KEY_ID=
AWS_SECRET_KEY=
AWS_SES_ENDPOINT=https://email.us-west-2.amazonaws.com
EMAIL=
```

#### license

MIT

#### contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

***

> Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).
