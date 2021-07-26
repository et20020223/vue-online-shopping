import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
      state: {
        isLoading: false,
        messages: [],
        cart:[],
        finalTotal:null,
        total:null,
      },
      mutations: {
        isLoading(state, playload) {
          state.isLoading = playload;
        },
        MESSAGES(state, playload) {
          state.messages.push(playload);
          //Vue.set(state, 'messages', playload);
        },
        REMOVE_MESSAGES(state, timestamp) {
          //this.state.messages.push(playload);
          console.log('state.messages', state.messages);
          state.messages.forEach((item, i) => {
            if (item.timestamp === timestamp) {
              state.messages.splice(i, 1);
            }
          });
        },
        ADD_TO_CART(state,playload){
          state.cart=[];
          state.cart.push(playload);
        },
        FINALTOTAL(state,playload){
          state.finalTotal =playload;
        },
        TOTAL(state,playload){
          state.total =playload;
        },
      },
      actions: {
        updateMessage(context, message, status = 'warning') {
          const timestamp = Math.floor(new Date() / 1000);

          context.commit('MESSAGES', {
            message,
            status,
            timestamp,
          });
          context.dispatch('removeMessageWithTiming', timestamp);
          //this.removeMessageWithTiming(timestamp);
        },
        removeMessageWithTiming(context, timestamp) {
          const vm = this;
          setTimeout(() => {
            context.commit('REMOVE_MESSAGES', timestamp);
          }, 5000);
        },
        getCart(context) {
          const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
          this.$http.get(url).then((response) => {
            console.log(response.data);
            if (response.data.success) {
              context.commit('ADD_TO_CART',response.data.data.cart);
              context.commit('FINALTOTAL',response.data.data.final_total);
              context.commit('TOTAL',response.data.data.total);
            } else {
              context.$store.dispatch('updateMessage', response.data.message);
            }
          })
        },
        removeCart(context,id) {
          const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart:${id}`;
          this.$http.delete(url).then((response) => {
              console.log(response.data);
              if (response.data.success) {
                context.$store.dispatch('getCart');
              } else {
                context.$store.dispatch('updateMessage', response.data.message);
              }
          })
      }
      },
      modules: {}    
})