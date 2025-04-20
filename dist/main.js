"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function initializeApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("data.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            setupEventListeners(data);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    });
}
function setupEventListeners(data) {
    const dessertCardsContainer = document.querySelector(".dessert-cards-container");
    const emptyCart = document.querySelector(".cart-empty");
    const cartItemsContainer = document.querySelector(".cart-items-container");
    const dialog = document.querySelector("dialog");
    const tempData = [];
    data.forEach((dessert, index) => {
        tempData.push(Object.assign(Object.assign({}, dessert), { quantity: 0, id: index + 1 }));
    });
    const cart = [];
    function getTotalCartItems(cart) {
        return cart.reduce((acc, dessert) => acc + dessert.quantity, 0);
    }
    const cartCount = document.querySelector(".cart__count");
    function updateCart(cart, cartCount) {
        cartCount.textContent = getTotalCartItems(cart).toString();
        if (cart.length === 0) {
            emptyCart.style.display = "flex";
            cartItemsContainer.style.display = "none";
        }
        else {
            emptyCart.style.display = "none";
            cartItemsContainer.style.display = "block";
            while (cartItemsContainer.firstChild) {
                cartItemsContainer.removeChild(cartItemsContainer.firstChild);
            }
            cart.forEach((item, index) => {
                const cartItemElement = document.createElement("div");
                cartItemElement.classList.add("cart-item");
                const cartItemDetails = document.createElement("div");
                cartItemDetails.classList.add("cart-item__details");
                const dessertName = document.createElement("p");
                dessertName.textContent = item.name;
                cartItemDetails.appendChild(dessertName);
                const dessertPrice = document.createElement("p");
                const quantity = document.createElement("span");
                quantity.textContent = `${item.quantity}x`;
                dessertPrice.appendChild(quantity);
                const singleDessertPrice = document.createElement("span");
                singleDessertPrice.textContent = `@ $${item.price.toFixed(2)}`;
                dessertPrice.appendChild(singleDessertPrice);
                const finalDesertPrice = document.createElement("span");
                finalDesertPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
                dessertPrice.appendChild(finalDesertPrice);
                cartItemDetails.appendChild(dessertPrice);
                cartItemElement.appendChild(cartItemDetails);
                const removeCartItem = document.createElement("button");
                removeCartItem.classList.add("btn-remove");
                const removeCartItemImage = document.createElement("img");
                removeCartItemImage.src = "/assets/images/icon-remove-item.svg";
                removeCartItemImage.alt = "btn-remove";
                removeCartItem.appendChild(removeCartItemImage);
                cartItemElement.appendChild(removeCartItem);
                removeCartItem.addEventListener("click", function () {
                    const dessertCards = document.querySelectorAll(".dessert-card");
                    dessertCards.forEach(function (card) {
                        const dessertName = card.querySelector(".dessert-card__name");
                        if (dessertName.textContent === item.name) {
                            const dessertImage = card.querySelector(".dessert-card__image");
                            dessertImage.style.border = "none";
                            const quantityControl = card.querySelector(".quantity-control");
                            quantityControl.style.display = "none";
                            const btnCart = card.querySelector(".btn-cart");
                            btnCart.style.display = "flex";
                        }
                    });
                    cart.splice(index, 1);
                    updateCart(cart, cartCount);
                });
                cartItemsContainer.appendChild(cartItemElement);
            });
            const cartTotal = document.createElement("div");
            cartTotal.classList.add("cart-total");
            const totalText = document.createElement("p");
            totalText.textContent = "Order Total";
            const totalAmount = document.createElement("p");
            const totalPrice = cart
                .reduce(function (acc, dessert) {
                return acc + dessert.price * dessert.quantity;
            }, 0)
                .toFixed(2);
            totalAmount.textContent = `$${totalPrice}`;
            cartTotal.appendChild(totalText);
            cartTotal.appendChild(totalAmount);
            const carbonNeutral = document.createElement("div");
            carbonNeutral.classList.add("carbon-neutral");
            const carbonNeutralImage = document.createElement("img");
            carbonNeutralImage.src = "assets/images/icon-carbon-neutral.svg";
            carbonNeutralImage.alt = "carbon-neutral";
            const carbonNeutralText = document.createElement("p");
            const carbonNeutralSpan = document.createElement("span");
            carbonNeutralSpan.textContent = "carbon neutral";
            carbonNeutralText.textContent = `This is a ${carbonNeutralSpan.textContent} delivery`;
            carbonNeutral.appendChild(carbonNeutralImage);
            carbonNeutral.appendChild(carbonNeutralText);
            const confirmOrder = document.createElement("button");
            confirmOrder.classList.add("btn-confirm-order");
            confirmOrder.textContent = "Confirm Order";
            confirmOrder.addEventListener("click", function () {
                dialog.showModal();
                const orderSummary = document.querySelector(".order-summary");
                while (orderSummary.firstChild) {
                    orderSummary.removeChild(orderSummary.firstChild);
                }
                cart.forEach(function (item) {
                    const orderSummaryItem = document.createElement("div");
                    orderSummaryItem.classList.add("order-summary-item");
                    const orderSummaryItemDetails = document.createElement("div");
                    orderSummaryItemDetails.classList.add("order-summary-item__details");
                    const orderSummaryItemImage = document.createElement("img");
                    orderSummaryItemImage.src = item.image.desktop;
                    orderSummaryItemImage.alt = item.name;
                    const orderSummaryItemDetailsText = document.createElement("div");
                    orderSummaryItemDetailsText.classList.add("order-summary-item__details__text");
                    const orderSummaryItemName = document.createElement("p");
                    orderSummaryItemName.textContent = item.name;
                    const orderSummaryItemPrice = document.createElement("p");
                    const orderItemQuantity = document.createElement("span");
                    orderItemQuantity.textContent = `${item.quantity}x`;
                    const orderItemPerPrice = document.createElement("span");
                    orderItemPerPrice.textContent = `$${item.price.toFixed(2)}`;
                    orderSummaryItemPrice.appendChild(orderItemQuantity);
                    orderSummaryItemPrice.appendChild(orderItemPerPrice);
                    orderSummaryItemDetailsText.appendChild(orderSummaryItemName);
                    orderSummaryItemDetailsText.appendChild(orderSummaryItemPrice);
                    orderSummaryItemDetails.appendChild(orderSummaryItemImage);
                    orderSummaryItemDetails.appendChild(orderSummaryItemDetailsText);
                    const singleOrderItemFinalPrice = document.createElement("p");
                    singleOrderItemFinalPrice.textContent = `$${(item.quantity * item.price).toFixed(2)}`;
                    orderSummaryItem.appendChild(orderSummaryItemDetails);
                    orderSummaryItem.appendChild(singleOrderItemFinalPrice);
                    orderSummary.appendChild(orderSummaryItem);
                });
                const orderSummaryTotal = document.createElement("div");
                orderSummaryTotal.classList.add("order-summary-total");
                const orderSummaryTotalText = document.createElement("p");
                orderSummaryTotalText.textContent = "Order Total";
                const orderSummaryTotalAmount = document.createElement("p");
                orderSummaryTotalAmount.textContent = `$${totalPrice}`;
                orderSummaryTotal.appendChild(orderSummaryTotalText);
                orderSummaryTotal.appendChild(orderSummaryTotalAmount);
                orderSummary.appendChild(orderSummaryTotal);
                const btnNewOrder = document.querySelector(".btn-new-order");
                btnNewOrder.addEventListener("click", function () {
                    dialog.close();
                    const dessertCards = document.querySelectorAll(".dessert-card");
                    dessertCards.forEach(function (card) {
                        const dessertImage = card.querySelector(".dessert-card__image");
                        dessertImage.style.border = "none";
                        const quantityControl = card.querySelector(".quantity-control");
                        quantityControl.style.display = "none";
                        const btnCart = card.querySelector(".btn-cart");
                        btnCart.style.display = "flex";
                    });
                    cart.length = 0;
                    updateCart(cart, cartCount);
                });
            });
            cartItemsContainer.appendChild(cartTotal);
            cartItemsContainer.appendChild(carbonNeutral);
            cartItemsContainer.appendChild(confirmOrder);
        }
    }
    tempData.forEach((dessert) => {
        // const cartCount = document.querySelector(".cart__count") as HTMLSpanElement;
        const dessertCard = document.createElement("div");
        dessertCard.classList.add("dessert-card");
        const dessertCardImageContainer = document.createElement("div");
        dessertCardImageContainer.classList.add("dessert-card__image-container");
        const dessertImage = document.createElement("img");
        dessertImage.src = dessert.image.desktop;
        dessertImage.classList.add("dessert-card__image");
        dessertCardImageContainer.appendChild(dessertImage);
        const btnCart = document.createElement("button");
        btnCart.classList.add("btn-cart");
        const addToCartImage = document.createElement("img");
        addToCartImage.src = "assets/images/icon-add-to-cart.svg";
        addToCartImage.style.width = "20px";
        btnCart.textContent = "Add to Cart";
        btnCart.appendChild(addToCartImage);
        dessertCardImageContainer.appendChild(btnCart);
        const quantityControl = document.createElement("div");
        quantityControl.classList.add("quantity-control");
        const decrement = document.createElement("button");
        decrement.classList.add("decrement");
        const decrementImage = document.createElement("img");
        decrementImage.src = "assets/images/icon-decrement-quantity.svg";
        decrementImage.style.width = "10px";
        decrement.appendChild(decrementImage);
        quantityControl.appendChild(decrement);
        const quantityDisplay = document.createElement("span");
        quantityDisplay.textContent = "1";
        quantityControl.appendChild(quantityDisplay);
        const increment = document.createElement("button");
        increment.classList.add("increment");
        const incrementImage = document.createElement("img");
        incrementImage.src = "assets/images/icon-increment-quantity.svg";
        incrementImage.style.width = "10px";
        increment.appendChild(incrementImage);
        quantityControl.appendChild(increment);
        dessertCardImageContainer.appendChild(quantityControl);
        dessertCard.appendChild(dessertCardImageContainer);
        const dessertCardCategory = document.createElement("p");
        dessertCardCategory.textContent = dessert.category;
        dessertCardCategory.classList.add("dessert-card__category");
        const dessertCardName = document.createElement("p");
        dessertCardName.textContent = dessert.name;
        dessertCardName.classList.add("dessert-card__name");
        const dessertCardPrice = document.createElement("p");
        dessertCardPrice.textContent = `$${dessert.price.toFixed(2)}`;
        dessertCardPrice.classList.add("dessert-card__price");
        dessertCard.appendChild(dessertCardCategory);
        dessertCard.appendChild(dessertCardName);
        dessertCard.appendChild(dessertCardPrice);
        dessertCardsContainer.appendChild(dessertCard);
        // Add event listeners for this specific card
        // let quantity = 0;
        btnCart.addEventListener("click", () => {
            dessertImage.style.border = "2px solid hsl(14, 86%, 42%)";
            // quantity = 1;
            // dessert.quantity = 1;
            cart.push(Object.assign(Object.assign({}, dessert), { quantity: 1 }));
            btnCart.style.display = "none";
            quantityControl.style.display = "flex";
            // quantityDisplay.textContent = dessert.quantity.toString();
            quantityDisplay.textContent = cart
                .find((item) => item.id === dessert.id)
                .quantity.toString();
            /*   const totalCartItems = getTotalCartItems(cart);
            cartCount.textContent = totalCartItems.toString(); */
            updateCart(cart, cartCount);
        });
        increment.addEventListener("click", () => {
            // dessert.quantity++;
            const item = cart.find((item) => item.id === dessert.id);
            item.quantity = item.quantity + 1;
            quantityDisplay.textContent = item.quantity.toString();
            /*      const totalCartItems = getTotalCartItems(cart);
            cartCount.textContent = totalCartItems.toString(); */
            updateCart(cart, cartCount);
        });
        decrement.addEventListener("click", () => {
            const item = cart.find((item) => item.id === dessert.id);
            if (item.quantity > 1) {
                // dessert.quantity--;
                item.quantity = item.quantity - 1;
                quantityDisplay.textContent = item.quantity.toString();
                /*     const totalCartItems = getTotalCartItems(cart);
                cartCount.textContent = totalCartItems.toString(); */
                updateCart(cart, cartCount);
            }
            else {
                // item.quantity = 0;
                cart.splice(cart.indexOf(item), 1);
                quantityControl.style.display = "none";
                btnCart.style.display = "flex";
                dessertImage.style.border = "none";
                /*  const totalCartItems = getTotalCartItems(cart);
                cartCount.textContent = totalCartItems.toString(); */
                updateCart(cart, cartCount);
            }
        });
    });
    /*  const confirmOrderBtn = document.querySelector(
      ".btn-confirm-order"
    ) as HTMLButtonElement;
  
    confirmOrderBtn.addEventListener("click", function () {
      console.log("confirm order");
      dialog.showModal();
    }); */
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
}
initializeApp();
