<template>
    <div class="not-found">
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
      <p>
        <button @click="goBack" class="back-button">Kembali Ke Jalan Ninja Yang Benar Dattebayo...</button>
        <!-- <router-link to="/" class="home-link">Atau Kembali ke Halaman Utama</router-link> -->
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
    font-family: Arial, sans-serif;
  }
  
  .not-found h1 {
    font-size: 2.5em;
    color: #d9534f;
  }
  
  .not-found p {
    font-size: 1.2em;
    color: #555;
  }
  
  .back-button {
    background-color: #5bc0de;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    margin-right: 10px;
  }
  
  .back-button:hover {
    background-color: #31b0d5;
  }
  
  .home-link {
    color: #5bc0de;
    text-decoration: underline;
  }
  
  .home-link:hover {
    color: #31b0d5;
  }
  </style>
  