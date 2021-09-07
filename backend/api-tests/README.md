# How to run
1. Install dependencies
    * Within this directory, run `npm install`
2. Start BE app
    * Within parent directory `/Hopin-Exam-QE/backend/` run `npm start`
3. Run tests
    * Run `npm test` in parent directory (or alternatively run `npm test` in `api-tests` directory)

### Design decisions
I have chosen to use Supertest as http client, Mocha for test framework and Chai for assertion library for a lightweight and quick API test framework. 

* Supertest can be replaced with axios or any other http client library as the main benefit is built-in assertion syntax on the API response which I supplemented with Chai anyway
* Mocha is supposedly quicker than Jest/Jasmine as it was designed for node applications, but this didn't really factor into my choice as I chose it due to familiarity - similarly to Supertest it can be replaced with alternatives like Jest/Jasmine whilst largely maintaining the same describe- it syntax 
* Chai is a great extension to node-assert and was used here to assert that a response body object did not contain a given property (much better than writing your own function to check hasOwnProperty and throwing an error)
* I've also saved mocha as a dev dependency in the backend folder and added it as part of the test hook so we can run the tests directly from backend directory. This way we can deploy the backend app and run the tests using the same entry point (npm start -> npm test) which should be easier for CI/CD and/or containerising.
* Why Javascript? req/res is in JSON which can be serialised as javascript object and intuitively checked (we can iterate through object properties without having to cast it to a dictionary or map) - Also using npm scripts to solely handle app build, start, test, deploy e.t.c. is a big bonus

##### Main coverage:
* Correct HTTP method - 200 on POST and 404 on GET 
* Correct req/resp format 
    * What happens if i provide no {name: "name"} in req?
    * What happens if i provide plain/text?
* Business logic validation - Is size correctly calculated from employees?

##### Notes:
* Should we validate req payload and return 422 if incorrect format/shape?