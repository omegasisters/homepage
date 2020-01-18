FROM node:alpine

WORKDIR /omegasisters-webpage

# Cache node packages
# ADD doesn't make cache so you should use COPY
COPY package.json yarn.lock ./

RUN yarn

COPY . .

ENTRYPOINT ["yarn", "start:docker"]
