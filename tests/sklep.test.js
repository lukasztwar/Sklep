const { test, expect } = require('@playwright/test');
const { SCP } = require('../PageObjects/sklepPageObjects')

//Parameters
const TshirtName = 'Designer Men Casual Formal Double Cuffs Grandad Band Collar Shirt Elegant Tie'
const shoeName = 'New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals'
const ShoeSize = '6 UK'
const productName = 'shock'
const name = 'Ludek'
const lastName = 'Small'
const Email = 'LSmall@wp.pl'
const Address = 'Uliczka 1'
const postalCode = '01-111'


test('dodanie koszulki', async ({page}) => {
    
    const ShoppingCartPage = SCP(page)
    await ShoppingCartPage.visit()

    await ShoppingCartPage.goToTShirtsCategory();
    await ShoppingCartPage.selectTShirt(TshirtName);
    await ShoppingCartPage.addToCart()

})

test('dodanie butów', async ({page}) => {

    const ShoppingCartPage = SCP(page)
    await ShoppingCartPage.visit()

    await ShoppingCartPage.goToShoesCategory(shoeName, ShoeSize)
    await ShoppingCartPage.addToCart()

})

test('dodanie kosmetyków przez wyszukiwarkę', async ({page}) => {

    const ShoppingCartPage = SCP(page)
    await ShoppingCartPage.visit()

    await ShoppingCartPage.searchForProduct(productName)
    await ShoppingCartPage.addToCart()

})

test('dodanie 3 produktów, sprawdzenie koszyka i zamówienie', async ({page}) => {

    const ShoppingCartPage = SCP(page)
    await ShoppingCartPage.visit()

    await ShoppingCartPage.goToTShirtsCategory();
    await ShoppingCartPage.selectTShirt(TshirtName);
    await ShoppingCartPage.addToCart()

    await ShoppingCartPage.goToShoesCategory(shoeName, ShoeSize)
    await ShoppingCartPage.addToCart()

    await ShoppingCartPage.searchForProduct(productName)
    await ShoppingCartPage.addToCart()

    await ShoppingCartPage.cartCheck(TshirtName,shoeName, productName)

    await ShoppingCartPage.checkoutAsGuest(name, lastName, Email, Address, postalCode )


})