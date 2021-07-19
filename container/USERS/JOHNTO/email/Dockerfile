FROM golang

RUN go get github.com/sourcegraph/go-ses
ADD . /go/src/github.com/johnotander/email
RUN go install github.com/johnotander/email
ENTRYPOINT /go/bin/email

EXPOSE 3000
