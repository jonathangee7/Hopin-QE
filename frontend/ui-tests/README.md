# How to run
1. Install dependencies
    * Within this directory, run `npm install`
2. Start FE app
    * Within parent directory `/Hopin-Exam-QE/frontend/` run `npm start`
3. Run tests
    * Run `npm test` in `ui-tests` directory (or alternatively run `npx cypress run`)
    * We can also use `npx cypress open` to further explore the UI tests as cypress run only outputs to terminal + writes screenshots/videos to respective folders

### Design decisions
I have chosen to use Cypress as UI test framework and supplemented with faker.js to generate dummy data.

* Cypress was my choice due to supporting describe-it syntax OOTB keeping consistency with BE tests - there is also an opportunity to use cypress for e2e tests as there is a plugin to support Gherkin syntax as well
* I used mocha-style hooks to setup the BE mocks where necessary and changed the mocked response for the specific test cases that needed it - this allows the UI to be tested far more quickly and thoroughly without having to wait and configure BE data as with e2e tests
* I built page object classes to hide some of the complexity in selecting elements, this could be taken further by hiding multiple validation steps into a single method or having a reusable login method that types and clicks submit for example. Having more granular methods makes writing tests easier but reading tests harder, and vice versa when putting more abstractions in.
* Some drawbacks for cypress compared to alternatives would be lack of cross-browser testing or lack of async/await support as everything has to be done via cypress command chains, this can be seen in Contact Details scenario where I have to 'wrap' an object initialised with faker.js then alias it so it can be used in other steps. 
* Why Javascript? I chose javascript due to familiarity with tooling, unlike with BE testing - we can build UI acceptance (and e2e) test frameworks in other langauges with good feature parity as long as there is good developer/community support.

##### Main coverage:
* Sign in username validation (alert prompt)
* Customer list description text is correctly generated
* Table is correctly generated 
* Contact details is correctly generated
* Contact details are correctly validated (no contact details prompt)