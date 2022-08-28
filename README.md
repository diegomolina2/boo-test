# Boo-test

## Description
A challenge with tasks in nodeJs, MongoDb.

- ## Task Objectives
  - Part 1
    - Store the profile data in a MongoDB database instead of in memory.
    - Add a post route for creating new profiles.
    - Update the get route to handle profile ids in the url. The server should retrieve the corresponding profile from the database and render the page accordingly.
  - Part 2
    - Implement a backend API that supports the commenting and voting functionality described in the Figma
      -  https://www.figma.com/file/8Iqw3VwIrHceQxaKgGAOBX/HTML%2FCSS-Coding-Test?node-id=0%3A1
    - You do not need to implement the frontend. Assume that the frontend will call your backend API in order to create user accounts, post comments, get/sort/filter comments, and like/unlike comments.
    - You do not need to implement secure auth or picture uploads. The only attribute needed for user accounts is name. Assume that anyone can access and use any user account.
    - All data should be stored in the same database used in Part 1.
  - Part 3
    - Add automated tests to verify the implementation of Part 1 and Part 2.
    
## How to start the project

- To Install de dependencies
```
npm install
```
- To Start the Project
```
npm start
```
- To Run Tests
```
npm test
```

## API Collection
- Postman collection available [here](https://www.getpostman.com/collections/c05bf9404786282babf7)

## Database
To save data I'm using Atlas Cluster MongoDB (free). The Database is connected when start the project

## Tasks descriptions
- Store the profile data in a MongoDB database instead of in memory.
- Add a post route for creating new profiles.
    - Created a CRUD for profiles

    | Method Name  | method | Path | Body
    | ------------- |:-------------:| :-------------:|:-------------:|
    | Get All      | get | http://localhost:3000/api/profiles |
    | Get by Id      | get | http://localhost:3000/api/profiles/{profileId} |
    | Edit by id     | patch | http://localhost:3000/api/profiles/{profileId} | json with parameter to update
    | Delete by Id      | delete | http://localhost:3000/api/profiles/{profileId} |
    | Create     | post | http://localhost:3000/api/profiles | json with parameters to create
- Update the get route to handle profile ids in the url. The server should retrieve the corresponding profile from the database and render the page accordingly.
    | Render name  | Path 
    | ------------- |:-------------:|
    | Render profile by id      |  http://localhost:3000/profiles/{profileId}  |
- Implement a backend API that supports the commenting and voting functionality described in the Figma
    - Created a CRUD for user

    | Method Name  | method | Path | Body
    | ------------- |:-------------:| :-------------:|:-------------:|
    | Get All      | get | http://localhost:3000/api/users |
    | Get by Id      | get | http://localhost:3000/api/users/{userId} |
    | Edit by id     | patch | http://localhost:3000/api/users/{userId} | json with parameter to update
    | Delete by Id      | delete | http://localhost:3000/api/users/{userId} |
    | Create     | post | http://localhost:3000/api/users | json with parameters to create
    
 - Created a CRUD for comments

    | Method Name  | method | Path | Body
    | ------------- |:-------------:| :-------------:|:-------------:|
    | Get All      | get | http://localhost:3000/api/comments |
    | Get All with sort filter     | get | http://localhost:3000/api/comments?sort=desc |
    | Get by personality with sort filter     | get | http://localhost:3000/api/comments?personality=zodiac&sort=desc |
    | Get All by likes    | get | http://localhost:3000/api/comments?likes=desc |
    | Get by personality & by likes    | get | http://localhost:3000/api/comments?likes=desc&personality=zodiac |
    | Get by Id      | get | http://localhost:3000/api/comments/{commentId} |
    | Edit by id     | patch | http://localhost:3000/api/comments/{commentId} | json with parameter to update
    | Delete by Id      | delete | http://localhost:3000/api/comments/{commentId} |
    | Create     | post | http://localhost:3000/api/comments | json with parameters to create
    
 - Created a CRUD for likes
    - One user can like a comment once using "create endpoint"
    - To unlike the comment needs to use "delete by Id endpoint"
    - Once one like is created the data is saved in "comments.likes" too

    | Method Name  | method | Path | Body
    | ------------- |:-------------:| :-------------:|:-------------:|
    | Get All      | get | http://localhost:3000/api/like |
    | Get by Id      | get | http://localhost:3000/api/like/{likeId} |
    | Get by Comment Id      | get | http://localhost:3000/api/like/comment{commentId} |
    | Delete by Id      | delete | http://localhost:3000/api/like/{likeId} |
    | Create     | post | http://localhost:3000/api/like | json with parameters to create
    
 - Created a CRUD for votes
    - One user can vote in comment as few or as many of the 3 personality systems as they want
    - To unvote the comment needs to use "delete by Id endpoint"
    - Once one vote is created the data is saved in "comments.votes" too

    | Method Name  | method | Path | Body
    | ------------- |:-------------:| :-------------:|:-------------:|
    | Get All      | get | http://localhost:3000/api/vote |
    | Get by Id      | get | http://localhost:3000/api/vote/{voteId} |
    | Get by Comment Id      | get | http://localhost:3000/api/vote/comment{commentId} |
    | Delete by Id      | delete | http://localhost:3000/api/vote/{voteId} |
    | Create     | post | http://localhost:3000/api/vote | json with parameters to create
    
- ## Tests
  Using Jest was created tests to validate the CRUD in the models
    - comment.model.test.js
    - like.model.test.js
    - profile.model.test.js
    - user.model.test.js
    - vote-model.test.js
    
    Total 18 tests
    
- ## Final notes
  - To handle with personalities was created a migration to save all in the database
  - Created a method to validate personalities type and values before request the endpoints
  - Created a separated folder to handle with database methods
  - Created a structure to be more clear to handle with responsabilities (Controller, Model, Service)
    
- ## What can be improved?
  - How to handle with errors and API status
  - Coverage all application with tests
  - The way to handle with Business rules



    
    
