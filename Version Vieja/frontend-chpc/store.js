// src/store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    carrito: [],
  },
  mutations: {
    agregarAlCarrito(state, producto) {
      state.carrito.push(producto);
    },
    eliminarDelCarrito(state, productoId) {
      state.carrito = state.carrito.filter((producto) => producto.id !== productoId);
    },
  },
  actions: {
    agregarAlCarrito({ commit }, producto) {
      commit('agregarAlCarrito', producto);
    },
    eliminarDelCarrito({ commit }, productoId) {
      commit('eliminarDelCarrito', productoId);
    },
  },
  getters: {
    carrito: (state) => state.carrito,
  },
});

export default store;
