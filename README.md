# url-shortner-service

Url-shortening service built with node.js, expressjs and mongoDB.

## Environment Setup (node version: v10.15.3 and above; mongodb version: v3.6.12 and above)
###### Clone repo:
```sh
git clone https://github.com/pavi-rstg/url-shortening-service.git
cd url-shortening-service
```
###### Create a `.env` file at project base path:

```sh
DATABASE_URL=mongodb://localhost:27017/shortUrl
NODE_ENV=development
PORT=5000
```
Database URI is mandatory. Please set `NODE_ENV=production` for production environment.

###### Install dependencies and run:
For development:
```sh
npm install
npm run dev
```
For production:
```sh
npm install --only=prod
npm start
```
Recommended: to use a process manager such as [pm2](http://pm2.keymetrics.io/ "pm2") to run the service in production.
```sh
npm install pm2 -g
pm2 start npm -- start
```
