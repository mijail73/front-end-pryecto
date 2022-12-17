<template>
  <v-snackbar
    v-model="snackbar"
    :color="colorSB"
    :timeout="3000"
    content-class="text-center"
    top
  >
    {{ textSB }}
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  components: {},
  data() {
    return {
      colorSB: "",
      textSB: "",
      snackbar: false,
    };
  },
  methods: {
    createSnackBar(color, text) {
      this.colorSB = color;
      this.textSB = text;
      this.snackbar = true;
    },
  },
};
</script>