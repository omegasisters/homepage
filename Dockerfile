FROM node:alpine

WORKDIR /omegasisters-webpage
ADD . /omegasisters-webpage

RUN yarn
ENTRYPOINT ["yarn", "start:docker"]
