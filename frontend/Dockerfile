FROM  node:10

ENV NPM_CONFIG_LOGLEVEL warn

ARG app_env

ENV APP_ENV $app_env

RUN mkdir -p /frontend
WORKDIR /frontend

COPY ./ ./

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 3000