FROM gagafonov/node-14.18-alpine3.14-ci:latest

WORKDIR /app

RUN apk --update add bash

COPY docker/index.js .
COPY docker/package.json .
COPY hm_editor.admin.web hm_editor.admin.web

RUN npm install --unsafe-perm=true --allow-root

EXPOSE 23071
CMD [ "node", "./index.js" ]
