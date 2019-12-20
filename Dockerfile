FROM node:alpine
WORKDIR /omegasisters-webpage

# Cache node packages
ADD package.json /omegasisters-webpage
ADD yarn.lock /omegasisters-webpage
RUN yarn

ADD . /omegasisters-webpage

ENTRYPOINT ["yarn", "start:docker"]
