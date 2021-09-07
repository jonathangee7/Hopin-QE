# Test Plan

  ## Background / Scope
  This test plan will format test cases as Gherkin features and scenarios and be performed manually. I have also added '//Pass' or '//Fail' on applicable steps and made a few comments below each feature when a failure occurs. The scope of this test plan is to run through some basic positive and negative paths in an e2e fashion where the application can be treated as a blackbox - I've chosen to use Gherkin syntax due to its succinctness, business readability and direct portability to many e2e test automation frameworks.

## Test Plan
#### login.feature
```gherkin
Feature: Login and Customer list validation
	Scenario: Login with valid username
		Given I am on Welcome Screen page
		When I submit a Username
		Then I am on Customer List page //Pass
			And Username is diplayed on Customer List page //Pass
			And correct time is displayed on Customer List page //Pass
			
	Scenario: User is prompted for username if not provided
		Given I am on Welcome Screen page
		When I submit an empty username
		Then "Please provide your name" alert is displayed //Pass
```
  #### customerList.feature
```gherkin
Feature: Customer list and contact details validation
	Scenario Outline: User can see contact details page and handles no contact info error
		Given I am on Customer List page
		When I click on customer <customer>
		Then I am on Contact Details page
			And the page displays <customer> name, <noOfEmployees>,
			<size> and <contact>
			And the page displays No contact info available if <contact> is null
	Examples:
		| "customer"         | "Employees" | "size"   | "contact"                             | 
		| "Americas Inc."    | 10          | "Small"  | "John Smith (jsmith@americasinc.com)" | //Pass
		| "Caribian Airlnis" | 1000        | "Medium" | "Jose Martinez (martines@cair.com)"   | //Pass
		| "MacroSoft"        | 540         | "Medium" | "Bill Paxton (bp@ms.com)"             | //Pass
		| "United Brands"    | 20          | "Medium" | null                                  | //Fail
		| "Bananas Corp"     | 10000       | "Big"    | Xavier Hernandez (xavier@bananas.com) | //Pass
		| "XPTO.com"         | 102         | "Medium" | "Daniel Zuck (zuckh@xpto.com)"        | //Pass
	
```
For United Brands case, we are unable to render the contact details page or see No contact info available message/alert.
  #### contactDetails.feature
```gherkin
Feature: Contact details validation

    Scenario: User can return to Customer List page from Contact Details page
		Given I am on Contact Details page
		When I click on Back to the list button
		Then I am on Customer List page //Pass
```