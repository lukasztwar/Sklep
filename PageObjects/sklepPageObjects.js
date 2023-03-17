const { test, expect, selectOption } = require('@playwright/test');

class ShoppingCartPage {

    url = 'https://automationteststore.com/'
    mainpageCategoryBarSelector = 'Apparel & accessories'
    TshirtsCategorySelector = 'T-shirts'
    cartSelector = ' Add to Cart'
    ShoesCategorySelector = 'Shoes'
    mainpageSearchField = 'Search Keywords'
    GoButton = 'Go'
    cartCheckout = '#cart_checkout1'
    guestCheckoutButton = 'Guest Checkout'
    continueButton = ' Continue' 
    firstnameFieldSelector = '#guestFrm_firstname'
    lastnameFieldSelector = '#guestFrm_lastname'
    emailFieldSelector = '#guestFrm_email'
    addressFieldSelector = '#guestFrm_address_1'
    cityFieldSelector = '#guestFrm_city'
    zoneFieldSelector = '#guestFrm_zone_id'
    postcodeFieldSelector = '#guestFrm_postcode'
    confirmButton = ' Confirm Order'
    continueCheckoutButton = ' Continue'
    cartContentPanel = '[class="contentpanel"]'


    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto(this.url)
    }

    async goToTShirtsCategory() {
        await this.page.getByRole('link', { name: this.mainpageCategoryBarSelector }).click();
        await this.page.getByRole('link', { name: this.TshirtsCategorySelector, exact: true }).click();
    }
        
    async selectTShirt(TshirtName) {
        await this.page.getByRole('link', { name: TshirtName }).click();
    }
        
    async addToCart() {
        await this.page.getByRole('link', { name: this.cartSelector }).click();
    }

    async goToShoesCategory(shoeName, ShoeSize ) {
        await this.page.getByRole('link', { name: this.mainpageCategoryBarSelector }).click();
        await this.page.getByRole('link', { name: this.ShoesCategorySelector, exact: true }).click();
        await this.page.getByRole('link', { name: shoeName }).click();
        await this.page.getByLabel(ShoeSize).check();
    }

    async searchForProduct(Keywords) {
        await this.page.getByPlaceholder(this.mainpageSearchField).click();
        await this.page.getByPlaceholder(this.mainpageSearchField).fill(Keywords);
        await this.page.getByTitle(this.GoButton).locator('i').click();
    }

    async cartCheck(TshirtName, shoeName, productName) {
        const element = this.page.locator(this.cartContentPanel)
        const text = await element.textContent();
        expect(text).toContain(TshirtName,shoeName, productName);
    }

    async checkoutAsGuest(name, lastName, Email, Address, postalCode ) {
        await this.page.locator(this.cartCheckout).click();
        await this.page.getByLabel(this.guestCheckoutButton).check();
        await this.page.getByRole('button', { name: this.continueButton }).click();
        await this.page.locator(this.firstnameFieldSelector).fill(name);
        await this.page.locator(this.lastnameFieldSelector).fill(lastName);
        await this.page.locator(this.emailFieldSelector).fill(Email);
        await this.page.locator(this.addressFieldSelector).fill(Address);
        await this.page.locator(this.cityFieldSelector).fill('London');
        await this.page.locator(this.zoneFieldSelector).selectOption('3547');
        await this.page.locator(this.postcodeFieldSelector).fill(postalCode);
        await this.page.getByRole('button', { name: this.continueCheckoutButton }).click();
        await this.page.getByRole('button', { name: this.confirmButton }).click();

    }
}



const SCP = (page) => new ShoppingCartPage(page)

module.exports = { SCP }