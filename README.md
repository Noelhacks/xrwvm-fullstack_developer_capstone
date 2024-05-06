# Project
Building a website that allows new and existing customers to look up different branches by state and look at customer reviews of the various branches. Customers should be able to create an account and add their review for any of the branches.

## Architecture Overview


User management implemented using the Django user authentication system and REACT frontend.

## Backend services.

Node.js server is used to manage dealers and reviews using MongoDB and dockerize it.
Sentiment analyzer is deployed on Code Engine.
Created Django models and views to manage car model and car make.
Created Django proxy services and views to integrate dealers and reviews together.

### Added dynamic pages with Django templates.

Created a page that displays all the dealers.
Created a page that displays reviews for a selected dealer.
Created a page that lets the end user add a review for a selected dealer.
Implemented CI/CD, and then run and test your application

### Set up continuous integration and delivery for code linting.
Run application on Cloud IDE.
Tested the updated application locally.
Deployed the application on Kubernetes.

## Solution architecture
The solution will consist of multiple technologies

The user interacts with the "Dealerships Website", a Django website, through a web browser.

The Django application provides the following microservices for the end user:

* get_cars/ - To get the list of cars from
* get_dealers/ - To get the list of dealers
* get_dealers/:state - To get dealers by state
* dealer/:id - To get dealer by id
* review/dealer/:id - To get reviews specific to a dealer
* add_review/ - To post review about a dealer
  
The Django application uses SQLite database to store the Car Make and the Car Model data.

The "Dealerships and Reviews Service" is an Express Mongo service running in a Docker container. It provides the following services::

* /fetchDealers - To fetch the dealers
* /fetchDealer/:id - To fetch the dealer by id
* /fetchReviews - To fetch all the reviews
* /fetchReview/dealer/:id - To fetch reviews for a dealer by id
* /insertReview - To insert a review
"Dealerships Website" interacts with the "Dealership and Reviews Service" through the "Django Proxy Service" contained within the Django Application.

The "Sentiment Analyzer Service" is deployed on IBM Cloud Code Engine, it provides the following service:

* /analyze/:text - To analyze the sentiment of the text passed. It returns positive, negative or neutral.
The "Dealerships Website" consumes the "Sentiment Analyzer Service" to analyze the sentiments of the reviews through the Django Proxy contained within the Django application.

![image](https://github.com/diversv/xrwvm-fullstack_developer_capstone/assets/111029490/060b3e4f-2c6e-4a57-ba8a-d068855d547b)

Also in the Cool branch has the optional assignments with code
