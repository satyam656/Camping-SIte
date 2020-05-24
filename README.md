# Camping-Site App
It is a camping-site web app which lists handpicked camping sites chosen by users.

This project is created using Node.js, Express, MongoDB, Mongoose, Passport.js, Bootstrap.

![Index Page](https://i.imgur.com/rBm6LJd.png)

![show page](https://i.imgur.com/JWIOq4T.png)

![show page](https://i.imgur.com/P5iO2Ji.png)

## Features

* Authentication of User (by username and password).
* Users having account on website can create camping-site post.
* Only Authorised user can edit or delete post.
* Users having account can discuss about any particular post in comment section.
* Only Authorised user can edit and delete their comment about any post.

## NPM packages used

* ejs
* express
* express-session
* method-override
* body-parser
* connect-flash
* mongoose
* passport
* passport-local
* passport-local-mongoose

## Run it Locally

Install node.js, MongoDB

```
git clone https://github.com/satyam656/Camping-SIte.git
cd Camping SIte
npm install
```

* run ```mongod``` in terminal
* run ```node app.js``` in another terminal
* visit [localhost:3000](localhost:3000)
