
#!/bin/bash

if [ ! -f .yarn-cache.tgz ]; then
  echo "+ build: Init empty .yarn-cache.tgz"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

docker build -t turbogethhd:latest .

docker run \
  --rm \
  --entrypoint cat \
  service-name:latest \
  /tmp/yarn.lock > /tmp/yarn.lock

if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "+ build: Saving Yarn cache"

  docker run \
    --rm \
    --entrypoint tar \
    service-name:latest \
    czf - /root/.yarn-cache/ > .yarn-cache.tgz

  echo "+ build: Saving yarn.lock"

  cp /tmp/yarn.lock yarn.lock
fi
