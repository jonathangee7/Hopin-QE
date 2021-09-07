import CustomerListPage from './CustomerListPage';

class WelcomePage {
    visit() {
        cy.visit('http://localhost:3000/');
    }

    typeUsername(username) {
        const field = cy.get(`input[id=name]`);
        field.clear();
        field.type(username);
        return this;
    }

    clickSubmitButton() {
        const button = cy.get(`input[value=Submit]`);
        button.click();
        return new CustomerListPage();
    }
}

export default WelcomePage;