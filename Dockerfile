FROM node:alpine
COPY . /
RUN yarn
ENTRYPOINT ["yarn", "start"]
