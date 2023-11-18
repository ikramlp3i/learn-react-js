
import { getProducts, findProduct, createProduct, updateProduct, deleteProduct, titleProduct, formDIalogProduct } from "../actions/products";

const initialState = {
  products: [],
  product: null,
  title: null,
  form_dialog: false
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case getProducts.type:
      return {
        ...state,
        products: action.payload
      };
    case findProduct.type:
      return {
        ...state,
        product: action.payload
      };
    case createProduct.type:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case updateProduct.type:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          } else {
            return product;
          }
        })
      };
    case deleteProduct.type:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload.id)
      };
    case titleProduct.type:
      return {
        ...state,
        title: action.payload
      }
    case formDIalogProduct.type:
      return {
        ...state,
        form_dialog: action.payload
      }
    default:
      return state;
  }
};

export default productsReducer; 