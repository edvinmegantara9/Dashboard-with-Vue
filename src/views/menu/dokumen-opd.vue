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
                <div class="col-md-12 mb-3">
                  <label class="form-label" for="newData.title">Judul Dokumen</label>
                  <input type="text" class="form-control" id="newData.title" v-model="newData.title" placeholder="Username">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label" for="newData.file">Upload File</label>
                  <input type="file" class="form-control" id="newData.file" @change="selectFile">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label" for="newData.document_type">Tipe File</label>
                  <Select2 v-model="newData.document_type" id="newData.document_type" :options="myOptions" @change="myChangeEvent($event)" @select="mySelectEvent($event)" placeholder="### Pilih Tipe Dokumen ###"/>
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
              <ul v-for="check in checklist" :key="check.id">
                <li>{{ check.title }}</li>
              </ul>
              <!-- <p class="text-danger text-center">{{ newData.name }}</p> -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-dark rounded shadow" @click="hideConfirm">
                Kembali
              </button>
              <button type="button" class="btn btn-danger rounded shadow" v-if="modalTitle == 'Hapus Data'" @click="deleteData">
                Hapus
              </button>
              <button type="button" class="btn btn-warning rounded shadow" v-if="modalTitle == 'Unduh Data'" @click="downloadData">
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
            <div class="col-md-9">
              <button v-if="checklist.length > 0" type="button" class="mx-2 btn btn-danger rounded shadow" @click="confirmDelete">
                Delete Checklist</button>
              <button v-else type="button" class="mx-2 btn btn-danger rounded shadow">
                Delete Checklist</button>
              <button v-if="checklist.length > 0" type="button" class="mx-2 btn btn-warning rounded shadow">
                Download Checklist</button>
              <button v-else type="button" class="mx-2 btn btn-warning rounded shadow">
                Download Checklist</button>
              <button type="button" class="mx-2 btn bg-original rounded shadow" @click="addNewForm">+ Document</button>
            </div>
            <div class="col-md-3">
              <div class="input-group-md mb-3">
                <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2">
              </div>
            </div>
          </div>
          <div class="row">
            <table class="table">
              <thead class="bg-dark">
                <tr>
                  <th scope="col">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" @click="checkAll" id="doc">
                      <label class="form-check-label" for="docAll"></label>
                    </div>
                  </th>
                  <th scope="col">File Name</th>
                  <th scope="col">Jenis Dokumen</th>
                  <th scope="col">Upload By</th>
                  <th scope="col">Upload Date</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="doc in documents" :key="doc.id">
                  <th scope="col">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" :id="doc.id" :value="doc" v-model="checklist">
                      <label class="form-check-label" :for="doc.id"></label>
                    </div>
                  </th>
                  <td>{{ doc.title }}</td>
                  <td>{{ doc.document_type.name }}</td>
                  <td>{{ doc.upload_by }}</td>
                  <td>{{ doc.updated_at }}</td>
                  <td>
                    <button type="button" class="mx-2 btn btn-warning rounded-pill shadow-sm" @click="downloadFile(doc.file)">
                    Download</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<script>
import firebase from "firebase/compat";
import Select2 from 'v-select2-component';

export default {
  components: {Select2},
  data() {
    return {
      // select-2
      myValue: '',
      myOptions: [],
      // data
      myData : {},
      documents : {},
      documentsType : {},
      progress : 0,
      checklist : [],
      success : null,
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
    // SELECT-2
    // #####################
    myChangeEvent(val){
      console.log(val);
    },
    mySelectEvent({id, text}){
      console.log({id, text})
    },

    // GETDATA
    // #####################   
    getDocuments() {
      this.$store
      .dispatch("docs/getDocuments")
      .then((resp) => {
        this.documents = resp.data.data;
        this.lPage = resp.data.last_page;
      })
      .catch((err) => { console.log(err); alert("Gagal Memuat Data!!\n\n" + err); });
    },
    getDocumentsType() {
      this.$store
      .dispatch("docs/getDocumentsType")
      .then((resp) => { 
        this.documentsType = resp.data.data;
        this.documentsType.forEach(element => {
          this.myOptions.push({id:element.id, text:element.name});
        });
        // this.lPage = resp.data.last_page;
      })
      .catch((err) => { console.log(err); alert("Gagal Memuat Data!!\n\n" + err); });
    },

    // CRUD
    // #####################
    addData() {
      this.$store
      .dispatch("docs/addDocuments", this.newData)
      .then((resp) => { 
        console.log(resp);
        this.hideModal();
        alert("Selamat! Data Berhasil Ditambah!!");
        this.getDocuments();
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
        this.getDocuments();
      })
      .catch((err) => { console.log(err); alert("Gagal Mengolah Data!!\n\n" + err); });
    },
    deleteData() {
      this.checklist.forEach(element => {
        this.$store
        .dispatch("docs/deleteDocuments", element.id)
        .then((resp) => { 
          console.log(resp);
          this.success = true;
        })
        .catch((err) => { console.log(err); this.success = err; });
      });
      if (this.success == true) {
        this.hideConfirm();
        alert("Data Berhasil Dihapus!!");
        this.getDocuments();
      } else {
        this.hideConfirm();
        alert("Gagal Mengolah Data!!\n\n" + this.success);
        this.getDocuments();
      }
    },
    selectFile(event) {
      console.log(event);
      this.file = event.target.files[0];
      this.uploadFile(this.file);
    },
    uploadFile(file) {
      var storageRef = firebase
        .storage()
        .ref("docsOPD/" + file.name)
        .put(file);
      // storageRef.put(this.file);
      storageRef.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
          alert("Permintaan Gagal Diproses!!\n\n" + error.message);
        },
        () => {
          this.progress = 100;
          storageRef.snapshot.ref.getDownloadURL().then((resp) => {
            this.newData.file = resp;
            // console.log();
            alert("Selamat! File Berhasil Diupload!!");
          });
        }
      );
    },
    downloadFile(url) {
      window.open(url,'_blank');
    },
    downloadData() {
      let number = null;
      this.checklist.forEach((element, index) => {
        window.open(element.file, '_blank');
        number = number + (index+1);
      });
      if (number == this.checklist.length) {
        this.hideConfirm();
      }
    },
    checkAll(){
      alert("ok") 
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
    confirmDelete() {
      this.modalTitle = "Hapus Data"
      this.isConfirmVisible = true;
    },
    confirmDownload() {
      this.modalTitle = "Unduh Data"
      this.isConfirmVisible = true;
    },
    hideConfirm(){
      this.newData = {};
      this.checklist = [];
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
    this.getDocuments();
    this.getDocumentsType();
    this.$store
    .dispatch("auth/me")
    .then((resp) => { 
      console.log(resp.data)
      this.newData.upload_by = resp.data.id;
      // this.lPage = resp.data.last_page;
    })
    .catch((err) => { console.log(err); alert("Gagal Memuat Data!!\n\n" + err); });
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

