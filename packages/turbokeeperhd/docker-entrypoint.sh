#!/bin/sh

yarn config set cache-folder $YARN_CACHE_FOLDER
cd $CUSTOMIZATIONS_PATH
(yarn check --integrity && yarn check --verify-tree) || yarn install --frozen-lockfile
cd $DEVENV_PATH

# Call command issued to the docker service
exec "$@"
