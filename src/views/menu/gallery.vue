<template>
  <div>
    <h3 class="font-weight-bold">Gallery</h3>
    <br/>
    <CContainer class="pr-md-5" fluid>
      <CRow class="mb-2">
        <CCol sm="12" class="text-right"><CLink>All <CIcon name="cil-arrow-right" /></CLink></CCol>
      </CRow>
      <CRow v-if="gallery.length > 0">
        <CCol md="4" sm="6" v-for="glr in gallery" :key="glr.id">
          <CCard class="rounded">
            <CCardHeader class="p-0">
              <CCardLink :href=glr.file target="_blank" class="">
                <CCardImg
                  :src=glr.file
                  style="object-fit: cover"
                  height="400px"
                  variant="full"
                />
              </CCardLink>
            </CCardHeader>
            <CCardBody>
              <h5 class="font-weight-bold">{{ glr.title }}</h5>
              <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> -->
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow v-else>
        <CCol sm="12">
          Tidak ada Gallery
        </CCol>
      </CRow>
      <CPagination
        v-if="total > params.row"
        :activePage.sync="page"
        :pages="last_page"
        @update:activePage="pagination"
        align="center"
      />
    </CContainer>
  </div>
</template>


<script>
import axios from "axios";

export default {

  data() {
    return {
      gallery: [],
      page: 1,
      last_page: 1,
      total: 0,
      form: {},
      params: {
        sorttype: "asc",
        sortby: "id",
        row: 6,
        page: 1,
      },
      createModal: false,
      isUpdate: false,
      isShow: false,
    }
  },
  methods: {
    getData() {
      var loading = this.$loading.show();
      var get_gallery = axios.get("/gallery", { params: this.params })
        .then((resp) => {
          this.gallery = resp.data.data.data;
          this.total = resp.data.data.total;
          this.last_page = resp.data.data.last_page;
          loading.hide();
        })
        .catch((e) => {
          this.$toast.error(e);
          loading.hide();
        });
    },

    pagination(page) {
      this.page = page;
      this.params.page = page;
      this.getData();
    },
  },
  mounted() {
    this.getData();
  }
};
</script>