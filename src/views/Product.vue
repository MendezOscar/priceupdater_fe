<template>
  <div class="container">
    <h3>Products</h3>

    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>

    <form @submit.prevent="editProduct(productEdit)" v-if="!add">
      <h5>Edit new product</h5>
      <div class="form-row">
        <div class="form-group col-md-12">
          <input
            class="form-control"
            placeholder="name"
            v-model="productEdit.name"
          />
          <div class="invalid-feedback">Please provide a first name.</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>sell in</label>

          <input
            type="number"
            class="form-control"
            v-model="productEdit.sellin"
          />
        </div>
        <div class="form-group col-md-6">
          <label>price</label>
          <input
            type="number"
            class="form-control"
            v-model="productEdit.price"
          />
        </div>
      </div>
      <b-button class="btn-warning my-2" type="submit"
        >Edit product</b-button
      >
      <b-button class="my-2" type="submit" @click="add = true">Cancel</b-button>
    </form>

    <br>

    <form @submit.prevent="addProduct()" v-if="add">
      <h5>Add new product</h5>
      <div class="form-row">
        <div class="form-group col-md-12">
          <input
            class="form-control"
            placeholder="name"
            v-model="product.name"
          />
          <div class="invalid-feedback">Please provide a first name.</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>sell in</label>

          <input type="number" class="form-control" v-model="product.sellin" />
        </div>
        <div class="form-group col-md-6">
          <label>price</label>
          <input type="number" class="form-control" v-model="product.price" />
        </div>
      </div>
      <b-button class="btn-success my-2 btn-block" type="submit"
        >Add new product</b-button
      >
    </form>

    <br>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Sell In</th>
          <th scope="col">Price</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.sellin }}</td>
          <td>{{ item.price }}</td>
          <td>
            <b-button
              @click="deleteProduct(item._id)"
              class="btn-danger btn-sm my-2"
              >Delete</b-button
            >
            <b-button @click="ActiveForm(item._id)" class="btn-warning btn-sm"
              >Edit</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      mensaje: { color: "success", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
      product: { name: "", sellin: 0, price: 0 },
      add: true,
      productEdit: {},
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.axios
        .get("/product")
        .then((res) => {
          this.products = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    addProduct() {
      this.axios
        .post("/new-product/", this.product)
        .then((res) => {
          this.products.push(res.data);
          this.mensaje.color = "success";
          this.mensaje.texto = "The product saved sucess";
          this.showAlert();
        })
        .catch((e) => {
          this.mensaje.color = "danger";
          this.mensaje.texto = "The product have a error";
          this.showAlert();
        });
    },
    deleteProduct(id) {
      this.axios
        .delete(`/product/${id}`)
        .then((res) => {
          const index = this.products.findIndex(
            (item) => item._id === res.data._id
          );
          this.products.splice(index, 1);
          this.mensaje.color = "success";
          this.mensaje.texto = "The product deleted sucess";
          this.showAlert();
        })
        .catch((e) => {
          this.mensaje.color = "danger";
          this.mensaje.texto = "The product have a error";
          this.showAlert();
        });
    },
    ActiveForm(id) {
      this.add = false;
      this.axios
        .get(`/product/${id}`)
        .then((res) => {
          this.productEdit = res.data;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    editProduct(item) {
      this.axios
        .put(`/product/${item._id}`, item)
        .then((res) => {
          let index = this.products.findIndex(
            (itemProduct) => itemProduct._id === this.productEdit._id
          );
          this.products[index].name = this.productEdit.name;
          this.products[index].selin = this.productEdit.selin;
          this.products[index].price = this.productEdit.price;

          this.productEdit = {};

          this.mensaje.texto = "Product updated";
          this.mensaje.color = "success";
          this.showAlert();
        })
        .catch((e) => {
          console.log(e);
        });
      this.add = true;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>