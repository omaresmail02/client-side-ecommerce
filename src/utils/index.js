export const addItemToShoppingCart = (
  cartItem = {},
  shoppingCartItems = []
) => {
  const existsItem = shoppingCartItems.find((item) => item.id === cartItem.id);

  if (existsItem) {
    return shoppingCartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};

export const addItemToFavorite = (favItem = {}, favoriteItems = []) => {
  const existsItem = favoriteItems.find((item) => item.id === favItem.id);

  if (existsItem) {
    return favoriteItems.map((item) =>
      item.id === favItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...favoriteItems, { ...favItem, quantity: 1 }];
};
