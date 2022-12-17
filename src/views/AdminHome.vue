<template>
    <div>

        <!-- Snackbar -->
        <SnackBar ref="sbcomponent" />

        <!-- dialog info -->
        <v-dialog v-model="dialogItem" max-width="600px">
            <v-card>
                <v-card-title>
                    {{ vocabloTitulo }}
                </v-card-title>
                <div>
                    <ol>
                        <li><b>Categoria:</b> {{ categoria }}</li>
                        <li><b>Materia:</b> {{ materia }}</li>
                        <li><b>Acepcion:</b> {{ acepcion }}</li>
                        <li><b>Derivadas:</b> {{ derivadas }}</li>
                        <li><b>Sinonimos:</b> {{ sinonimos }}</li>
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

        <!-- dialog delete -->
        <v-dialog v-model="dialogDelete" max-width="600px" persistent>
            <v-card>
                <v-card-title>
                    Esta seguro que desea eliminar el vocablo: {{ vocabloABorrar }} ?
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialogDelete = false; borrarVocablo(vocabloABorrar);">
                        Borrar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="dialogDelete = false">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <!-- dialogAgregar -->
        <v-row justify="center">
        <v-dialog v-model="dialogAgregar" persistent max-width="600px">
          <v-card>
            <v-form ref="agregaForm" v-model="validAgregaForm">
              <v-card-title>
                <span class="headline">Creación de vocablo</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Vocablo"
                        required
                        v-model="vocabloAdd"
                        :rules="rulesAgrega"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Materia"
                        required
                        v-model="materiaAdd"
                        :rules="rulesAgrega"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Categoria"
                        required
                        v-model="categoriaAdd"
                        :rules="rulesAgrega"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Acepcion"
                        required
                        v-model="acepcionAdd"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Vocablos derivados"
                        required
                        v-model="derivadasAdd"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Sinonimos"
                        required
                        v-model="sinonimosAdd"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="
                    dialogAgregar = false;
                    cerrarDialogAgregar();
                  "
                >
                  Cerrar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    dialogAgregar = false;
                    agregar();
                  "
                  :disabled="!validAgregaForm"
                >
                  Agregar
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- dialogEditar -->
      <v-row justify="center">
        <v-dialog v-model="dialogEditar" persistent max-width="600px">
          <v-card>
            <v-form ref="editaForm" v-model="validEditaForm">
              <v-card-title>
                <span class="headline">Edición de vocablo {{vocabloEditar}}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Materia"
                        required
                        v-model="materiaEditar"
                        :rules="rulesAgrega"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Categoria"
                        required
                        v-model="categoriaEditar"
                        :rules="rulesAgrega"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Acepcion"
                        required
                        v-model="acepcionEditar"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Vocablos derivados"
                        required
                        v-model="derivadasEditar"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Sinonimos"
                        required
                        v-model="sinonimosEditar"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="
                    dialogEditar = false;
                    cerrarDialogEditar();
                  "
                >
                  Cerrar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="
                    dialogEditar = false;
                    editar(vocabloEditar);
                  "
                  :disabled="!validEditaForm"
                >
                  Editar
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>


        <v-card style="margin-top: 3%">
            <v-row><v-card-title primary-title>
                    <h3>VOCABLOS</h3>
                </v-card-title></v-row>
            <v-row style="margin-top: 0%">
                <v-col cols="6">
                    <v-card-title>
                        <v-text-field v-model="busquedaVocablos" append-icon="mdi-magnify" label="Buscar vocablo"
                            single-line hide-details rounded outlined dense></v-text-field>
                    </v-card-title>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="2" style="margin-top: 2%">
                <v-btn color="blue darken-1" text @click="dialogAgregar = true">
                    Agregar
                    <v-icon class="mr-2">
                        mdi-plus
                    </v-icon>
                </v-btn>
            </v-col>
            </v-row>
            <v-col>
                <v-data-table :headers="headers" :items="vocablos" :items-per-page="15" :search="busquedaVocablos"
                    class="elevation-1" no-data-text="No hay vocablos registrados."
                    no-results-text="Ningun vocablo existe con esos datos." :footer-props="{
                        itemsPerPageText: 'vocablos por página',
                    }">

                    <template v-slot:[`item.info`]="{ item }">
                        <v-icon class="mr-2" @click="dialogItem = true;
                        verDetallesVocablo(item.vocablo);" title="Detalles">
                            mdi-eye
                        </v-icon>
                    </template>

                    <template v-slot:[`item.editar`]="{ item }">
                        <v-icon class="mr-2" @click="dialogEditar = true;
                        setEditar(item.vocablo);" title="Editar vocablo">
                            mdi-pencil
                        </v-icon>
                    </template>

                    <template v-slot:[`item.borrar`]="{ item }">
                        <v-icon class="mr-2" @click="dialogDelete = true;
                        vocabloABorrar = item.vocablo;" title="Eliminar vocablo"
                        color="red darken-2">
                            mdi-delete
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
                { text: "Más info", value: "info", align: "center" },
                { text: "Editar", value: "editar", align: "center" },
                { text: "Borrar", value: "borrar", align: "center" }
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
            sinonimos: "",

            //delete
            dialogDelete: false,
            vocabloABorrar: "",

            //agregar
            dialogAgregar:false,
            validAgregaForm:false,
            rulesAgrega: [
                (v) => !!v || "Este campo es requerido",
                (v) => (v && v.length > 5) || "Longitud mayor a 5",
            ],
            vocabloAdd: "",
            materiaAdd: "",
            categoriaAdd: "",
            acepcionAdd: "",
            derivadasAdd: "",
            sinonimosAdd: "",


            //editar
            dialogEditar:false,
            validEditaForm: false,
            vocabloEditar: "",
            materiaEditar: "",
            categoriaEditar: "",
            acepcionEditar: "",
            derivadasEditar: "",
            sinonimosEditar: "",

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
        borrarVocablo(vocablo) {
            axios
                .delete("http://localhost:8181/api/v1/vocablos/" + vocablo)
                .then((response) => {
                    if(response.status === 200) {
                        this.$refs.sbcomponent.createSnackBar(
                        "success",
                        "Vocablo borrado con exito.");
                        this.obtieneVocablos();
                    } else {
                        this.$refs.sbcomponent.createSnackBar(
                        "error",
                        "No es posible borrar el vocablo"
                        ); 
                    }
                })
                .catch(() => {
                    this.$refs.sbcomponent.createSnackBar(
                        "error",
                        "Conexión fallida, intente más tarde."
                    );
                });
        },
        cerrarDialogAgregar() {
            this.$refs.agregaForm.reset();
        },
        cerrarDialogEditar() {
            this.$refs.editaForm.reset();
        },
        createForm() {
            let data = new FormData();
            data.append("vocablo", this.vocabloAdd);
            data.append("materia", this.materiaAdd);
            data.append("categoria", this.categoriaAdd);
            data.append("acepcion", this.acepcionAdd);
            data.append("derivadas", this.derivadasAdd);
            data.append("sinonimos", this.sinonimosAdd);
            return data;
        },
        agregar() {
            if (this.validAgregaForm) {
                axios
                    .post("http://localhost:8181/api/v1/vocablos/", this.createForm())
                    .then((response) => {
                        if (response.status === 201) {
                            this.$refs.sbcomponent.createSnackBar(
                                "success",
                                "Vocablo registrado exitosamente"
                            );
                            this.obtieneVocablos();
                        } else if (response.status === 226) {
                            this.$refs.sbcomponent.createSnackBar(
                                "error",
                                "El vocablo ya se encuentra registrado"
                            );
                        }
                    })
                    .catch(() => {
                        this.$refs.sbcomponent.createSnackBar(
                            "error",
                            "Conexión fallida, intente más tarde."
                        );
                    });
            }
            this.$refs.agregaForm.reset();
        },
        setEditar(vocablo) {
            axios
                .get("http://localhost:8181/api/v1/vocablos/" + vocablo)
                .then((response) => {
                    if (response.status === 200) {
                        this.vocabloEditar = response.data.vocablo;
                        this.categoriaEditar = response.data.categoria;
                        this.materiaEditar = response.data.materia;
                        this.acepcionEditar = response.data.acepcion;
                        this.derivadasEditar = response.data.derivadas;
                        this.sinonimosEditar = response.data.sinonimos;
                    }
                })
                .catch(() => {
                    this.$refs.sbcomponent.createSnackBar(
                        "error",
                        "Conexión fallida, intente más tarde."
                    );
                });
        },
        createEditForm() {
            let data = new FormData();
            data.append("vocablo", this.vocabloEditar);
            data.append("materia", this.materiaEditar);
            data.append("categoria", this.categoriaEditar);
            data.append("acepcion", this.acepcionEditar);
            data.append("derivadas", this.derivadasEditar);
            data.append("sinonimos", this.sinonimosEditar);
            return data;
        },
        editar(vocablo) {
            if (this.validEditaForm) {
                axios
                    .put("http://localhost:8181/api/v1/vocablos/" + vocablo, this.createEditForm())
                    .then((response) => {
                        console.log(response.status);
                        if (response.status === 200) {
                            this.$refs.sbcomponent.createSnackBar(
                                "success",
                                "Vocablo actualizado exitosamente"
                            );
                            this.obtieneVocablos();
                        }
                    })
                    .catch(() => {
                        this.$refs.sbcomponent.createSnackBar(
                            "error",
                            "Conexión fallida, intente más tarde."
                        );
                    });
            }
            this.$refs.editaForm.reset();
        }
    },
    created() {
        this.obtieneVocablos();
    }
}
</script>