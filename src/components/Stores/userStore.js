import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
    avatar: ''
  }),
  actions: {
    setUser(user) {
      this.name = user.name;
      this.email = user.email;
      this.avatar = user.avatar;
    },
    clearUser() {
      this.name = '';
      this.email = '';
      this.avatar = '';
    }
  }
});
