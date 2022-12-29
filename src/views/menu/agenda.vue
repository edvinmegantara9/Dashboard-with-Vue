<template>
  <div>
    <h3>Agenda PEMBANGUNAN</h3>
    <hr />
    <div class="row">
      <div class="col-md-8">
        <CCard>
          <CCardBody>
            <CListGroup v-if="agendas.length > 0">
              <CListGroupItem v-for="agenda in agendas" :key="agenda.id">
                <div class="row">
                  <div class="col-md-1">
                    <CIcon
                      name="cil-bookmark"
                      size="custom-size"
                      class=""
                      :height="35"
                    />
                  </div>
                  <div class="col-md-11">
                    <CLink
                      @click="show(agenda)"
                      href="#"
                      class="font-weight-bold h5"
                      color="primary"
                      >{{ agenda.title }}</CLink
                    >
                    <br />
                    {{ agenda.content.slice(0, 75) + "...." }}
                    <p class="float-right text-muted mb-0 mt-n1"><small>{{ agenda.start_date }} - {{ agenda.end_date }}</small></p>
                  </div>
                </div>
              </CListGroupItem>
            </CListGroup>
            <CListGroup v-else>
              <CListGroupItem>
                <div class="row">Tidak ada agenda</div>
              </CListGroupItem>
            </CListGroup>
            <CPagination
              v-if="total !== items.length"
              :records="total"
              :per-page="params.row"
              :activePage.sync="page"
              :pages="last_page"
              @update:activePage="pagination"
              align="center"
            />
          </CCardBody>
        </CCard>
      </div>
      <div class="col-md-4 text-center">
        <div class="row mb-2">
          <div class="col-12">
            <button
              @click="create"
              v-if="
                user.role.name.toLowerCase() == 'admin' || user.role.is_opd == 0
              "
              class="btn btn-block btn-primary"
            >
              Tambah Agenda
            </button>
            <br />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <v-calendar
              title-position="left"
              style="width: 100%"
              :attributes="attrs"
            />
          </div>
        </div>
      </div>

      <CModal
        :title="!isUpdate ? 'Agenda' : 'Update Agenda'"
        :color="!isUpdate ? 'primary' : 'warning'"
        size="lg"
        :show.sync="createModal"
      >
        <CRow>
          <CCol sm="12">
            <CInput
              v-model="form.title"
              label="Judul Agenda"
              placeholder="Judul..."
              v-bind:readonly="isShow"
            />
            <CTextarea
              v-model="form.content"
              label="Deskripsi"
              placeholder="Deskripsi..."
              v-bind:readonly="isShow"
            />
            <CInput
              v-model="form.start_date"
              label="Tanggal Mulai"
              placeholder="mm/dd/yyyy"
              type="date"
              v-bind:readonly="isShow"
            />
            <CInput
              v-model="form.end_date"
              label="Tanggal Berakhir"
              placeholder="mm/dd/yyyy"
              type="date"
              v-bind:readonly="isShow"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <h4>Detail</h4>
            <br />
            <CContainer fluid>
              <CRow
                v-for="(item, k) in form_schedules"
                :key="k"
                alignVertical="center"
                aignHorizontal="center"
              >
                <CCol md="5">
                  <CInput
                    v-model="item.agenda_type"
                    label="Jenis Agenda"
                    placeholder="Jenis agenda..."
                    v-bind:readonly="isShow"
                  />
                </CCol>
                <CCol md="5">
                  <CInput
                    v-model="item.schedule"
                    label="Jadwal"
                    placeholder="Jadwal"
                    v-bind:readonly="isShow"
                  />
                </CCol>
                <CCol md="2" class="py-auto px-auto">
                  <CButton
                    color="danger"
                    class="btn-pill"
                    size="sm"
                    @click="removeSchedule(k)"
                    v-if="!isShow"
                  >
                    <CIcon size="sm" name="cil-minus" />
                  </CButton>
                </CCol>
              </CRow>
              <CRow class="text-center">
                <CCol>
                  <CButton
                    color="secondary"
                    class="text-primary w-100"
                    @click="addSchedule"
                    v-if="!isShow"
                  >
                    <CIcon size="sm" name="cil-plus" /> Jadwal
                  </CButton>
                </CCol>
              </CRow>
            </CContainer>
          </CCol>
        </CRow>
        <template
          slot="footer"
          v-if="
            user.role.name.toLowerCase() == 'admin' || user.role.is_opd == 0
          "
        >
          <div class="row">
            <button
              @click="destroy(form.id)"
              v-if="isUpdate || isShow"
              class="btn btn-danger mr-5"
            >
              Hapus Agenda
            </button>

            <button @click="closeModal" class="btn btn-secondary mr-3">
              Batal
            </button>

            <button
              @click="store"
              v-if="!isUpdate && !isShow"
              class="btn btn-primary"
            >
              Tambah Agenda
            </button>
            <button
              @click="edit"
              v-if="!isUpdate && isShow"
              class="btn btn-warning"
            >
              Edit Agenda
            </button>
            <button
              @click="update"
              v-if="isUpdate && !isShow"
              class="btn btn-primary"
            >
              Update Agenda
            </button>
          </div>
        </template>
      </CModal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VCalendar from "v-calendar";
import axios from "axios";

Vue.use(VCalendar);

export default {
  data() {
    return {
      attrs: [
        {
          key: "today",
          highlight: {
            color: "purple",
            fillMode: "solid",
            contentClass: "italic",
          },
          dates: new Date(),
        },
      ],
      agendas: [],
      roles: [],
      page: 1,
      last_page: 1,
      total: 0,
      form: {},
      form_schedules: [
        {
          agenda_type: "",
          schedule: "",
        },
      ],
      params: {
        sorttype: "desc",
        sortby: "id",
        row: 50,
        page: 1,
      },
      createModal: false,
      isUpdate: false,
      isShow: false,
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    getData() {
      var loading = this.$loading.show();
      var get_agenda = axios
        .get("/agenda", { params: this.params })
        .then((resp) => {
          this.agendas = resp.data.data.data;
          this.total = resp.data.data.total;
          this.last_page = resp.data.data.last_page;
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    create() {
      this.isUpdate = false;
      this.isShow = false;
      this.createModal = true;
      this.form_schedules = [
        {
          agenda_type: "",
          schedule: "",
        },
      ];
    },
    store() {
      var loading = this.$loading.show();
      this.form.agenda_detail = JSON.stringify(this.form_schedules);
      axios
        .post("/agenda", this.form)
        .then((resp) => {
          this.$toast.success("Berhasil menambah data!!");
          this.getData();
          this.closeModal();
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    show(item) {
      this.form = item;
      this.form.id = item.id;
      this.form_schedules = item.schedules;
      this.isShow = true;
      this.isUpdate = false;
      this.createModal = true;
    },
    edit() {
      this.isShow = false;
      this.isUpdate = true;
    },
    update() {
      var loading = this.$loading.show();
      this.form.agenda_detail = JSON.stringify(this.form_schedules);
      axios
        .put("/agenda/update/" + this.form.id, this.form)
        .then((resp) => {
          this.$toast.success("Berhasil memperbarui data!!");
          this.getData();
          this.closeModal();
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },
    destroy(id) {
      if (confirm("Data akan dihapus!!")) {
        var loading = this.$loading.show();
        axios
          .delete("/agenda/delete/" + id)
          .then((resp) => {
            this.$toast.success("Berhasil menghapus data!!");
            this.getData();
            this.closeModal();
            loading.hide();
          })
          .catch((e) => {
            this.$toast.error(e);
            loading.hide();
          });
      }
    },
    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
    },
    addSchedule(index) {
      this.form_schedules.push({
        agenda_type: "",
        schedule: "",
      });
    },
    removeSchedule(index) {
      if (this.isUpdate) {
        this.form_schedules.splice(index, 1);
      } else {
        this.form_schedules.splice(index, 1);
      }
    },
    closeModal() {
      this.createModal = false;
      this.isShow = false;
      this.isUpdate = false;
      this.form = {};
      this.form_schedules = [
        {
          agenda_type: "",
          schedule: "",
        },
      ];
    },
  },
  computed: {
    // computedAgendas() {
    //   if (this.agendas.length > 0) {
    //     return this.agendas.map((item) => {
    //       var now = new Date();
    //       var end_date = item.end_date != null ? Date(item.end_date) : new Date();
    //       if (end_date >= now) {
    //         return {
    //           ...item,
    //           start_date: item.start_date,
    //           end_date: item.end_date
    //         };
    //       }
    //     }).filter((item) => {return item !== undefined});
    //   } else {
    //     return [];
    //   }
    // }
  },
  mounted() {
    this.getData();
  },
};
</script>