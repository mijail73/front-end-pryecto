<template>
  <div>
    
    <!-- Snackbar -->
    <SnackBar ref="sbcomponent" />

    <!-- dialog info -->
    <v-dialog v-model="dialogItem" max-width="600px">
        <v-card>
          <v-card-title>  
            {{vocabloTitulo}}
          </v-card-title>
          <div>
            <ol>
              <li><b>Categoria:</b> {{categoria}}</li>
              <li><b>Materia:</b> {{materia}}</li>
              <li><b>Acepcion:</b> {{acepcion}}</li>
              <li><b>Derivadas:</b> {{derivadas}}</li>
              <li><b>Sinonimos:</b> {{sinonimos}}</li>
            </ol>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogItem = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <v-card>
      <v-row><v-card-title primary-title>
          <h3>VOCABLOS</h3>
        </v-card-title></v-row>
      <v-row style="margin-top: 0%">
        <v-col cols="6">
          <v-card-title>
            <v-text-field v-model="busquedaVocablos" append-icon="mdi-magnify" label="Buscar vocablo" single-line
              hide-details rounded outlined dense></v-text-field>
          </v-card-title>
        </v-col>
      </v-row>
      <v-col>
        <v-data-table :headers="headers" :items="vocablos" :items-per-page="15" :search="busquedaVocablos"
          class="elevation-1" no-data-text="No hay vocablos registrados."
          no-results-text="Ningun vocablo existe con esos datos." :footer-props="{
            itemsPerPageText: 'vocablos por página',
          }">

          <template v-slot:[`item.baja`]="{ item }">
            <v-icon class="mr-2" @click="dialogItem = true;
                                        verDetallesVocablo(item.vocablo);" 
                                        title="Detalles">
              mdi-eye
            </v-icon>
          </template>

        </v-data-table>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import SnackBar from "@/components/SnackBar.vue";

export default {
  components: {
    SnackBar,
  },
  data() {
    return {
      vocablos: [],
      headers: [
        { text: "Vocablos", value: "vocablo" },
        { text: "Materia", value: "materia" },
        { text: "Categoria", value: "categoria" },
        { text: "Más info", value: "baja", align: "center"}, 
      ],
      busquedaVocablos: "",
      // VerDetallesUsuaria
      vocablo: [],
      dialogItem: false,
      vocabloTitulo: "",
      categoria: "",
      materia: "",
      acepcion: "",
      derivadas: "",
      sinonimos: ""
    }
  },
  methods: {
    obtieneVocablos() {
      axios
        .get("http://localhost:8181/api/v1/vocablos")
        .then((response) => {
          if (response.status === 200) {
            this.vocablos = response.data;
          }
        })
        .catch(() => {
          this.$refs.sbcomponent.createSnackBar(
            "error",
            "Conexión fallida, intente más tarde."
          );
        });
    },
    verDetallesVocablo(vocablo) {
      axios
        .get("http://localhost:8181/api/v1/vocablos/" + vocablo)
        .then((response) => {
          if (response.status === 200) {
            this.vocabloTitulo = response.data.vocablo;
            this.categoria = response.data.categoria;
            this.materia = response.data.materia;
            this.acepcion = response.data.acepcion;
            this.derivadas = response.data.derivadas;
            this.sinonimos = response.data.sinonimos;
          }
        })
        .catch(() => {
          this.$refs.sbcomponent.createSnackBar(
            "error",
            "Conexión fallida, intente más tarde."
          );
        });
    },
  },
  created() {
    this.obtieneVocablos();
  }
}
</script>