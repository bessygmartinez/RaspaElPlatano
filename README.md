# :banana: Raspa El Platano
#### Created: February 2020
---

## ABOUT RASPA EL PLATANO

Raspa El Platano (which in English translates to "Scrape the Plantain") is a web scraper application that takes the latest articles posted by [The Plantain](http://www.theplantain.com). The Plantain is a satirical (meaning fake) publication that is based on Miami-centric topics.

The app makes use of html templates with the help from Express Handlebars. The Model–View–Controller (MVC) pattern is used for the structure of the file setup and script content. An Object-Relational Mapping (ORM) technique is used to tie the database usage and conroller script to manage the routing.

## SCREENSHOT
![alt text](https://raw.githubusercontent.com/bessygmartinez/RaspaElPlatano/master/public/assets/img/raspa_screenshot.jpg "Raspa El Platano Screenshot")

## APP OVERVIEW

When a user visits the website, the application will scrape stories from The Plantain and display them for the user. Each scraped article is saved to the application database. Each article has:

* Headline - the title of the article
* Summary - a short summary of the article
* URL - a link to the original article on The Plantain website

Users are also able to leave comments on each article displayed. The comments are associated with their specific article and saved to the database. Users are also able delete comments left on articles. All stored comments are visible to every user.

## TECHNOLOGIES USED
  * [JavaScript](https://www.javascript.com/)
  * [Node.js](https://nodejs.org/en/)
      * Node packages:
        * [express](https://www.npmjs.com/package/express)
        * [express-handlebars](https://handlebarsjs.com/)
        * [mongoose](https://mongoosejs.com/)
        * [cheerio](https://cheerio.js.org/)
        * [morgan](https://www.npmjs.com/package/morgan/v/1.1.1)
        * [axios](https://www.npmjs.com/package/axios)
        * [dotenv](https://www.npmjs.com/package/dotenv)
  * [Materialize](https://materializecss.com/)
  * [Heroku](http://www.heroku.com)
      * Heroku Add-ons:
        * [mLab MongoDB](https://elements.heroku.com/addons/mongolab)
