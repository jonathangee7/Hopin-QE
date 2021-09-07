## Start Here

### Task 1
Screenshot can be found at ./Task1.png at root of directory

### Task 2
Test plan can be found at ./Task2_Testplan.md
It is written in Gherkin syntax which can be further implemented as e2e tests. 
ASSUMPTION: these test cases are executed against the full deployed app (FE + BE) and use the 'live' data available in the deployed (local) environment

### Task 3
As this is a monorepo consisting of both BE and FE applications, api-tests folder sits in /backend folder and can be run against the BE independently.
There is a README at ./backend/api-tests/README.md

### Task 4
ui-tests folder sits in /frontend folder and can be run against the FE indepedently - mocking the BE allows faster feedback loop.
There is a README at ./frontend/ui-tests/README.md
