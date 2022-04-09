import { createActionsHook, createStateHook, createHook, createStore, defaults } from "react-sweet-state"
defaults.devtools = true

const initialState = {
  user: "",
  cartCount: 0,
}

const actions = {
  login: () => (({setState}) => setState({user: "Shawn"})),
  logout: () => (({setState}) => setState({user: ""})),
  addToCart: () => ({setState, getState}) => {
    setState({cartCount: getState().cartCount + 1})
  },
}

const store = createStore({initialState, actions, name: 'ecommerce'})

const useStore = createHook(store)
export default useStore

function useStoreState(fn) {
    const storeStateHook = createStateHook(store, {
      selector: fn
    })
    return storeStateHook()
}

const useAction = createActionsHook(store)

export const useLogin = () => useAction().login;
export const useLogout = () => useAction().logout;
export const useAddToCart = () => useAction().addToCart;

export const useUser = () => useStoreState(state => state.user);
export const useCartCount = () => useStoreState(state => state.cartCount);
