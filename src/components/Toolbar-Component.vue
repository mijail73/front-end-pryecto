<template>
  <div>
    <!-- Snackbar -->
    <SnackBar ref="sbcomponent" />
    <nav>
      <v-app-bar color="cyan lighten-2" dense>
        <v-toolbar-title class="white--text text-button hidden-xs-only">Diccionario - Proyecto Manejo de Datos
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="white--text text-button hidden-xs-only">
          {{ tipoUsuario }}
        </v-toolbar-title>
        <v-toolbar-items>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on" @click="login" color="white" v-show="tipoUsuario != 'Administrador'">
                <v-icon>mdi-account-key</v-icon>
              </v-btn>
            </template>
            <span>Admin</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on" @click="logout" color="white" v-show="tipoUsuario === 'Administrador'">
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </template>
            <span>LogOut</span>
          </v-tooltip>
        </v-toolbar-items>
      </v-app-bar>
    </nav>
    <div class="text-center">
      <v-dialog v-model="dialog" width="400" height="990">
        <v-card>
          <v-container>
            <v-form ref="passForm" v-model="validPassword" @submit.prevent="iniciarSesion">
              <v-text-field label="Contraseña" outlined v-model="password" type="password" required
                :rules="rulesPassword"></v-text-field>
              <div class="text-center">
                <v-btn class="ma-2" color="success" @click="iniciarSesion" :disabled="!validPassword">
                  INGRESAR
                </v-btn>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
    <UserHome v-show="tipoUsuario != 'Administrador'"/>
    <AdminHome v-show="tipoUsuario === 'Administrador'"/>
  </div>
</template>

<script>
import SnackBar from "@/components/SnackBar.vue";
import UserHome from "@/views/UserHome.vue";
import AdminHome from "@/views/AdminHome.vue";

export default {
  name: "Toolbar-Component",
  components: {
    SnackBar,
    UserHome,
    AdminHome
  },
  data() {
    return {
      password: "",
      tipoUsuario: "",
      dialog: false,
      validPassword: false,
      rulesPassword: [
        (v) => !!v || "Este campo es requerido",
        (v) => (v && v.length > 1)|| "La contraseña debe ser mayo a un digito.",
      ]
    }
  },
  methods: {
    iniciarSesion() {
      if(this.password === "mijail123") {
        this.tipoUsuario = "Administrador";
        this.$refs.sbcomponent.createSnackBar(
          "success",
          "Login"
        );
      } else {
        this.$refs.sbcomponent.createSnackBar(
          "error",
          "Contraseña incorrecta"
        );
      }
      this.$refs.passForm.reset();
      this.dialog = false;
    },
    login() {
      this.dialog = true;
    },
    logout() {
      location.reload();
      this.tipoUsuario = "";
      this.password = "";
      this.$refs.sbcomponent.createSnackBar(
          "warning",
          "Logout"
        );
    }
  }
}

</script>