<template>
  <div class="c-app flex-row align-items-start">
    <CContainer>
      <CRow class="">
        <CCol md="7" class="mt-5">
          <CRow>
            <!-- <CCol md="2">
              <img src="@/assets/logo/pagaralam.png" width="100%" alt="" />
            </CCol> -->
            <CCol md="5">
              <img src="@/assets/logo/bapedda.png" width="150%" alt="" />
            </CCol>
          </CRow>
          <CRow class="d-flex flex-row align-items-end">
            <img src="@/assets/logo/group.png" width="80%" alt="" />
          </CRow>
        </CCol>
        <CCol md="5" class="mt-5">
          <center>
            <img src="@/assets/logo/logo.png" width="50%" alt="" />
          </center>
          <br />
          <CCardGroup>
            <CCard class="p-4 radius">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="NIP"
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
                    <!-- <CCol col="6" class="text-right">
                      <CButton color="link" class="px-0"
                        >Forgot password?</CButton
                      >
                      <CButton color="link" class="d-lg-none"
                        >Register now!</CButton
                      >
                    </CCol> -->
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <!-- <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard> -->
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
          .then((resp) => {
            // console.log(resp.data);
            this.$router.replace({ name: "Home" });
            this.$toast.success("Login Berhasil");
            loader.hide();
          })
          .catch((e) => {
            this.$toast.error(e);
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