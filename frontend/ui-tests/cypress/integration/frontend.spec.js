import WelcomePage from '../pages/WelcomePage';
import faker from 'faker/locale/en_GB';

beforeEach(() => {
    cy.intercept('POST', 'http://localhost:3001/', defaultMockedResponse);
})

describe('Sign In', () => {
    it('should show an error message on empty input', () => {
        const welcomePage = new WelcomePage();
        welcomePage.visit();

        welcomePage.clickSubmitButton()
        cy.on('window:alert', (text) => {
            expect(text).to.equal(`Please provide your name`)
        });
    });

    it('should show username and date on customer list page with valid username submit', () => {
        const welcomePage = new WelcomePage();
        welcomePage.visit();

        const userName = faker.internet.userName();
        //ASSUMPTION: Timestamp from backend is correct and to the correct precision as well
        const currentDate = new Date().toDateString()

        let mockedRespose = { ...defaultMockedResponse, name: userName, timestamp: currentDate};

        cy.intercept('POST', 'http://localhost:3001/',
            mockedRespose
        )

        welcomePage.typeUsername(userName);
        const customerListPage = welcomePage.clickSubmitButton();

        customerListPage.getDescriptionText().should('include.text', userName);
        customerListPage.getDescriptionText().should('include.text', currentDate);
    });

});

describe('Customer lists', () => {

    //ASSUMPTION: We are only concerned with frontend rendering here so we can check 
    //the table renders correctly even if backend doesn't provide complete data by mocking api
    it('should show table headers Name # of employees and Size and display info if present', () => {
        cy.intercept('POST', 'http://localhost:3001/',
            {
                "name": "Jonathan Gee",
                "timestamp": "Mon Sep 06 2021",
                "customers": [
                    {
                        "id": 1, "name": "Americas Inc.",
                        //"employees": 10,
                        "contactInfo": { "name": "John Smith", "email": "jsmith@americasinc.com" },
                        "size": "Small"
                    },
                    {
                        // "id": 2, "name": "Caribian Airlnis",
                        "employees": 1000,
                        "contactInfo": { "name": "Jose Martinez", "email": "martines@cair.com" },
                        "size": "Big"
                    },
                    {
                        "id": 3, //"name": "MacroSoft",
                        "employees": 540,
                        "contactInfo": { "name": "Bill Paxton", "email": "bp@ms.com" },
                        "size": "Medium"
                    },
                    {
                        "id": 4, "name": "United Brands",
                        "employees": 20,
                        //  "size": "Small"
                    },
                    {
                        "id": 5, "name": "Bananas Corp",
                        "employees": 10000,
                        "contactInfo": { "name": "Xavier Hernandez", "email": "xavier@bananas.com" },
                        "size": "Big"
                    },
                    {
                        "id": 6, "name": "XPTO.com",
                        "employees": 102,
                        "contactInfo": { "name": "Daniel Zuck", "email": "zuckh@xpto.com" },
                        "size": "Medium"
                    }]
            })
        const welcomePage = new WelcomePage();
        welcomePage.visit();
        welcomePage.typeUsername("test123");
        const customerListPage = welcomePage.clickSubmitButton();

        customerListPage.getTableHeaders().contains('Name').should('exist');
        customerListPage.getTableHeaders().contains('# of Employees').should('exist');
        customerListPage.getTableHeaders().contains('Size').should('exist');
    });
});

describe('Contact Details', () => {
    beforeEach(() => {
        const customerContact = {
            customerName: faker.company.companyName(),
            employees: faker.datatype.number(),
            size: faker.random.arrayElement(['Small', 'Medium', 'Large']),
            contactName: faker.name.findName(),
            contactEmail: faker.internet.email()
        };
        cy.wrap(customerContact).as('customerContact');
    });
    it('should show full contact details when available', function () {
        cy.intercept('POST', 'http://localhost:3001/',
            {
                "name": "Jonathan Gee",
                "timestamp": "Mon Sep 06 2021",
                "customers": [
                    {
                        "id": 1, "name": this.customerContact.customerName,
                        "employees": this.customerContact.employees,
                        "contactInfo": { "name": this.customerContact.contactName, "email": this.customerContact.contactEmail },
                        "size": this.customerContact.size
                    },
                ]
            })
        const welcomePage = new WelcomePage();
        welcomePage.visit();
        welcomePage.typeUsername("test123");
        const customerListPage = welcomePage.clickSubmitButton();

        const contactDetailPage = customerListPage.clickCustomerDetail(this.customerContact.customerName);

        contactDetailPage.validateName(this.customerContact.customerName);
        contactDetailPage.validateEmployees(this.customerContact.employees);
        contactDetailPage.validateContact(`${this.customerContact.contactName} (${this.customerContact.contactEmail})`);
        contactDetailPage.validateSize(this.customerContact.size);
    });

    it('should navigate back to Customer list page', function () {
        cy.intercept('POST', 'http://localhost:3001/',
            {
                "name": "Jonathan Gee",
                "timestamp": "Mon Sep 06 2021",
                "customers": [
                    {
                        "id": 1, "name": this.customerContact.customerName,
                        "employees": this.customerContact.employees,
                        "contactInfo": { "name": this.customerContact.contactName, "email": this.customerContact.contactEmail },
                        "size": this.customerContact.size
                    },
                ]
            })
        const welcomePage = new WelcomePage();
        welcomePage.visit();
        welcomePage.typeUsername("test123");

        let customerListPage = welcomePage.clickSubmitButton();
        const contactDetailPage = customerListPage.clickCustomerDetail(this.customerContact.customerName);
        customerListPage = contactDetailPage.clickBackToList()
        customerListPage.getTableHeaders().should('exist');

    });

    it('should show "No contact info available" message when no contact info available', function () {
        cy.intercept('POST', 'http://localhost:3001/',
            {
                "name": "Jonathan Gee",
                "timestamp": "Mon Sep 06 2021",
                "customers": [
                    {
                        "id": 1, "name": this.customerContact.customerName,
                        "employees": this.customerContact.employees,
                        // "contactInfo": { "name": contactName, "email": contactEmail},
                        "size": this.customerContact.size
                    },
                ]
            })
        const welcomePage = new WelcomePage();
        welcomePage.visit();
        welcomePage.typeUsername("test123");
        const customerListPage = welcomePage.clickSubmitButton();

        const contactDetailPage = customerListPage.clickCustomerDetail(this.customerContact.customerName);
        cy.on('window:alert', (text) => {
            expect(text).to.equal(`No contact info available`)
        });
        contactDetailPage.validateName(this.customerContact.customerName)
        contactDetailPage.validateEmployees(this.customerContact.employees);
        contactDetailPage.validateSize(this.customerContact.size);
    });
});

const defaultMockedResponse = {
    "name": "Jonathan Gee",
    "timestamp": "Mon Sep 06 2021",
    "customers": [
        {
            "id": 1, "name": "Americas Inc.",
            //"employees": 10,
            "contactInfo": { "name": "John Smith", "email": "jsmith@americasinc.com" },
            "size": "Small"
        },
        {
            // "id": 2, "name": "Caribian Airlnis",
            "employees": 1000,
            "contactInfo": { "name": "Jose Martinez", "email": "martines@cair.com" },
            "size": "Big"
        },
        {
            "id": 3, //"name": "MacroSoft",
            "employees": 540,
            "contactInfo": { "name": "Bill Paxton", "email": "bp@ms.com" },
            "size": "Medium"
        },
        {
            "id": 4, "name": "United Brands",
            "employees": 20,
            //  "size": "Small"
        },
        {
            "id": 5, "name": "Bananas Corp",
            "employees": 10000,
            "contactInfo": { "name": "Xavier Hernandez", "email": "xavier@bananas.com" },
            "size": "Big"
        },
        {
            "id": 6, "name": "XPTO.com",
            "employees": 102,
            "contactInfo": { "name": "Daniel Zuck", "email": "zuckh@xpto.com" },
            "size": "Medium"
        }]
}