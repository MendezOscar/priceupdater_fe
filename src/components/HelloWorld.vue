<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <p>
      Hola, bienvenido al resultado de mi prueba de CO de ingeniero de software,
      esta tabla muestra el resultado al dia 30.
    </p>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Sell In</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.sellin }}</td>
          <td>{{ item.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
      specificDay: 0,
    };  
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(specificDay) {
      this.products = {};
      this.axios
        .get("/get-products-after-30-days")
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
