describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://192.168.1.4:5173') // указан локальный внешний айпи, он может быть другим
    cy.contains('Продукты').click()
    cy.contains('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops').click()
    cy.get("button.products-full__add").click()
    cy.get('a.header-bar__cart').click()
    cy.get('button.products-full__counter-add').click()
    cy.get('button.products-full__counter-remove').click()
    cy.contains('Оформить заказ').click()
    cy.get('button.ui-modal__close').click()
    cy.contains('Очистить').click()
    cy.contains('Продукты').click()

  })
})
