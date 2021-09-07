import ContactDetailsPage from './ContactDetailsPage';

class CustomerListPage {

    getDescriptionText() {
        const text = cy.get(`p`);
        return text;
    }

    getTableHeaders() {
        const headerElements = cy.get(`tr`).children();
        return headerElements;
    }

    clickCustomerDetail(customer) {
        const link = cy.get(`tbody`).contains(customer);
        link.click();
        return new ContactDetailsPage();
    }
}

export default CustomerListPage;