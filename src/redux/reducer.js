import {
  GET_ALL,
  ORDER_BY_NAME,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  SEARCH_NAME,
  REFRESH,

  // FILTER_BRAND_AND_PRICE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INITIALIZE_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "./action-types";

const initialState = {
  allClothes1: [],
  allClothes2: [],
  filteredByPrice: [],
  cart: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //OK
    case GET_ALL:
      return {
        ...state,
        allClothes1: payload,
        allClothes2: payload,
      };
    //OK
    case ORDER_BY_NAME: {
      const sortedArr =
        payload === "1"
          ? state.allClothes1.slice().sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allClothes1.slice().sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allClothes1: sortedArr,
      };
    }
    //OK
    case FILTER_BY_PRICE:
      return {
        ...state,
        allClothes1: payload,
      };
    //OK
    case SEARCH_NAME:
      return {
        ...state,
        allClothes1: payload,
      };

    case FILTER_BY_BRAND:
      return {
        ...state,
        allClothes1: payload,
        filteredByPrice: [], // Restablecer el filtrado por precio cuando cambia la marca
      };
    //OK
    case REFRESH: {
      const perrito = state.allClothes2;
      return {
        ...state,
        allClothes1: perrito,
      };
    }
    //.......para hacer todos los filtros juntos..........

    // case FILTER_BRAND_AND_PRICE: {
    //   return {
    //     ...state,
    //     allClothes1: payload,
    //   };
    // }

    //..............carrito OK.......................

    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    }

    case INITIALIZE_CART: {
      return {
        ...state,
        cart: payload,
      };
    }

    case REMOVE_FROM_CART: {
      const { itemId, color, size } = payload;
      const updatedCart = state.cart.filter(
        (item) =>
          item.id !== itemId || item.color !== color || item.size !== size
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Actualizar el localStorage
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case INCREASE_QUANTITY: {
      const { itemId, color, size } = payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id == itemId && item.color == color && item.size == size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case DECREASE_QUANTITY: {
      const { itemId, color, size } = payload;
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id == itemId && item.color == color && item.size == size
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };
    }
    //.........................................................

    default:
      return { ...state };
  }
};

export default reducer;
