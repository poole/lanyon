FROM jekyll/jekyll

RUN apk update && apk upgrade && apk add zip && apk add --no-cache util-linux

RUN gem install jekyll-paginate-v2 github-pages

RUN wget https://github.com/mikefarah/yq/releases/download/v4.15.1/yq_linux_amd64 -O /usr/bin/yq && chmod +x /usr/bin/yq

COPY ghp_export.sh /bin/ghp_export
COPY ghp_serve.sh /bin/ghp_serve