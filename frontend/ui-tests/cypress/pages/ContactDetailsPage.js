import CustomerListPage from "./CustomerListPage";

class ContactDetailsPage {

    validateName(name) {
        const text = cy.get(`p`).contains('Name:').parent();
        return text.should('include.text', name);
    }

    validateEmployees(employees) {
        const text = cy.get(`p`).contains('# of Employees:').parent();
        return text.should('include.text', employees);
    }

    validateSize(size) {
        const text = cy.get(`p`).contains('Size:').parent();
        return text.should('include.text', size);
    }

    validateContact(contact) {
        const text = cy.get(`p`).contains('Contact:').parent();
        return text.should('include.text', contact);
    }

    clickBackToList() {
        const button = cy.get(`input[value='Back to the list']`);
        button.click();

        return new CustomerListPage();
    }
}

export default ContactDetailsPage;