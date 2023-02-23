<template>
  <div class="c-app flex-row align-items-start">
    <CContainer>
      <CRow class="mt-5">
        <CCol md="7" class="mt-5">
          <CRow class="d-flex flex-row align-items-end">
            <img src="@/assets/logo/DONASI_02.png" width="70%" alt="" />
          </CRow>
        </CCol>
        <CCol md="5" class="mt-4">
          <center>
            <img src="@/assets/logo/DONASI_01.png" width="70%" alt="" />
          </center>
          <br />
          <CCardGroup>
            <CCard class="p-4 radius">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Nip"
                    v-model="form.nip"
                    autocomplete="nip"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    v-model="form.password"
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-lock-locked"
                    /></template>
                  </CInput>
                  <CRow>
                    <CCol col="12" class="text-left">
                      <CButton
                        color="primary"
                        @click="submit()"
                        class="px-4 btn-block"
                        >Login</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Login",

  data() {
    return {
      form: {},
    };
  },

  methods: {
    submit() {
      let loader = this.$loading.show();
      setTimeout(() => {
        this.$store
          .dispatch("auth/login", this.form)
          .then(() => {
            this.$router.replace({ name: "Home" });
            this.$toast.success("Login Berhasil");
            loader.hide();
          })
          .catch(() => {
            loader.hide();
          });
      }, 2000);
    },
  },
};
</script>

<style >
.radius {
  border-radius: 15px !important;
}
</style>