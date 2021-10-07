<template>
  <div>
    <h3>Agenda BAPPEDA</h3>
    <hr>
    <div class="row">
      <div class="col-md-8 pr-md-5">
        <CCard>
          <CCardBody>
            <CListGroup>
              <CListGroupItem v-for="agenda in agendas" :key="agenda.id">
                <div class="row">
                  <div class="col-1 text-center x-0"><CIcon name="cil-bookmark" size="custom-size" :height="35"/></div>
                  <div class="col-10 px-0">
                    <div class="row">
                      <div class="col-12">
                        <CLink href="#" class="font-weight-bold h5" color="primary" style="text-decoration: none">Tanggal {{ agenda.tanggal }}</CLink>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">{{ agenda.kegiatan }}</div>
                    </div>
                  </div>
                </div>
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </div>
      <div class="col-md-4">
        <v-calendar
          title-position="left"
          :attributes="attrs"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VCalendar from "v-calendar";

Vue.use(VCalendar)

export default {
  data() {
    return {
      agendas: [
        {id: 0, tanggal: '12 September 2021', kegiatan: 'Rapat Bappeda'},
        {id: 1, tanggal: '13 September 2021', kegiatan: 'Rapat edan'}
      ],
      attrs: [
        {
          key: 'today',
          highlight: {
            color: 'purple',
            fillMode: 'solid',
            contentClass: 'italic',
          },
          dates: new Date(),
        }
      ]
    }
  },
};
</script>