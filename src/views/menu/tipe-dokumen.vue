<template>
  <div>
    <h3>Tipe Dokumen</h3>
    <!-- Modal & Confirmation -->
    <section>
      <div class="modal" v-show="isModalVisible">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-original">
              <h6 class="m-auto">Form {{ modalTitle }}</h6>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col">
                  <div class="input-group mb-3">
                    <label class="input-group-text" for="newTitle">Nama Tipe Dokumen</label>
                    <input type="text" class="form-control" id="newTitle" v-model="newData.name" placeholder="Document Type">
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-dark rounded shadow" @click="hideModal">
                Kembali
              </button>
              <button v-if="modalTitle == 'Tambah Data Baru'" type="button" class="btn bg-original rounded shadow" @click="addData">Tambah Tipe Dokumen</button>
              <button v-if="modalTitle == 'Ubah Data'" type="button" class="btn bg-warning rounded shadow" @click="editData">Ubah Tipe Dokumen</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" v-show="isConfirmVisible">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-header bg-original">
              <h6 class="m-auto">{{ modalTitle }}</h6>
            </div>
            <div class="modal-body">
              <template v-if="modalTitle == 'Hapus Data'">
                <p class="text-center">Apakah Anda yakin ingin menghapus data ini?</p>
              </template>
              <template v-if="modalTitle == 'Unduh Data'">
                <p class="text-center">Apakah Anda yakin ingin mengunduh data ini?</p>
              </template>
              <p class="text-danger text-center">{{ newData.name }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-dark rounded shadow" @click="hideConfirm">
                Kembali
              </button>
              <button type="button" class="btn btn-danger rounded shadow" v-if="modalTitle == 'Hapus Data'" @click="deleteData">
                Hapus
              </button>
              <button type="button" class="btn btn-warning rounded shadow" v-if="modalTitle == 'Unduh Data'" @click="downloadData()">
                Unduh
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Main -->
    <section>
      <div class="row bg-white shadow-lg p-3 mb-5 mt-5 rounded">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-3 offset-9">
              <div class="input-group-md mb-3">
                <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2">
              </div>
            </div>
          </div>
          <div class="row">
            <table class="table">
              <thead class="bg-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Tanggal Dibuat</th>
                  <th scope="col">Tanggal Diubah</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(type,index) in documentsType" :key="type.id">
                  <td>{{ index+1 }}</td>
                  <td>{{ type.name }}</td>
                  <td>{{ type.created_at }}</td>
                  <td>{{ type.updated_at }}</td>
                  <td>
                    <!-- <span class="material-icons">
                      edit
                    </span>
                    <span class="material-icons">
                      delete
                    </span> -->
                    <button type="button" class="mx-2 btn btn-warning rounded-pill shadow-sm" @click="editForm(type)">
                    Edit</button>
                    <button type="button" class="mx-2 btn btn-danger rounded-pill shadow-sm" @click="confirmDelete(type)">
                    Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <button type="button" class="mx-2 btn bg-original rounded shadow-sm" @click="addNewForm">[+] Tambah Data</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<script>
// import firebase from "firebase";

export default {
  data() {
    return {
      userStatus : {},
      documentsType : {},
      // modal
      modalTitle : "",
      isModalVisible : false,
      isConfirmVisible : false,
      // pagination
      cPage : 1,
      lPage : null,
      // Post New Documents
      newData : {},
    };
  },
  methods: {
    // GETDATA
    // #####################   
    getDocumentsType() {
      this.$store
      .dispatch("docs/getDocumentsType")
      .then((resp) => { 
        this.documentsType = resp.data.data;
        // this.lPage = resp.data.last_page;
      })
      .catch((err) => { console.log(err); alert("Gagal Memuat Data!!\n\n" + err); });
    },

    // CRUD
    // #####################
    addData() {
      this.$store
      .dispatch("docs/addDocumentsType", this.newData)
      .then((resp) => { 
        console.log(resp);
        this.hideModal();
        alert("Selamat! Data Berhasil Ditambah!!");
        this.getDocumentsType();
      })
      .catch((err) => { console.log(err); alert("Gagal Mengolah Data!!\n\n" + err); });
    },
    editData() {
      const edited = {
        name : this.newData.name
      }
      this.$store
      .dispatch("docs/updateDocumentsType", {
        id : this.newData.id,
        data: edited
      })
      .then((resp) => { 
        console.log(resp);
        this.hideModal();
        alert("Selamat! Data Berhasil Diubah!!");
        this.getDocumentsType();
      })
      .catch((err) => { console.log(err); alert("Gagal Mengolah Data!!\n\n" + err); });
    },
    deleteData() {
      this.$store
      .dispatch("docs/deleteDocumentsType", this.newData.id)
      .then((resp) => { 
        console.log(resp);
        this.hideConfirm();
        alert("Data Berhasil Dihapus!!");
        this.getDocumentsType();
      })
      .catch((err) => { console.log(err); alert("Gagal Mengolah Data!!\n\n" + err); });
    },

    // FORMS
    // #####################
    addNewForm() {
      this.modalTitle = "Tambah Data Baru"
      this.isModalVisible = true;
    },
    editForm(type) {
      this.newData = type;
      this.modalTitle = "Ubah Data";
      this.isModalVisible = true;
    },
    hideModal(){
      this.newData = {};
      this.isModalVisible = false;
    },

    // CONFIRMATION
    // #####################
    confirmDelete(type) {
      this.newData = type;
      this.modalTitle = "Hapus Data"
      this.isConfirmVisible = true;
    },
    confirmDownload() {
      this.modalTitle = "Unduh Data"
      this.isConfirmVisible = true;
    },
    hideConfirm(){
      this.newData = {};
      this.isConfirmVisible = false;
    },

    // PAGINATION
    // #####################
    pageUp() {
      // this.isLoading = true;
      this.cPage = this.cPage + 1;
      this.getDocuments();
    },
    pageDown() {
      // this.isLoading = true;
      this.cPage = this.cPage - 1;
      this.getDocuments();
    },
    pageFirst() {
      // this.isLoading = true;
      this.cPage = 1;
      this.getDocuments();
    },
    pageLast() {
      // this.isLoading = true;
      this.cPage = this.lPage;
      this.getDocuments();
    },
    goto(count) {
      this.isLoading = true;
      this.cPage = count;
      this.getDocuments();
    },
  },
  mounted() {
    this.getDocumentsType();
  }
};
</script>

<style scoped>
.bg-original {
  background-color: #24548c; 
  color: white
}
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  display: block;
  overflow: hidden;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>

