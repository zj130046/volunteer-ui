<template>
  <v-card class="mx-auto" outlined>
    <v-list dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-content>
            <template>
              <v-card class="mx-auto" @click="apply(item.activityId)">
                <v-card-text>
                  <div>Word of the Day</div>
                  <p class="display1 text--primary">
                    {{item.activityName}}
                  </p>
                  <p>{{item.categoryName}}</p>
                  <div class="text--primary">
                    {{item.crater}}创建于{{timeData(item.createTime)}}
                  </div>
                </v-card-text>
              </v-card>
            </template>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div class="text-center">
      <v-pagination v-model="getAPI.currPage" :length="getAPI.pageNum" :total-visible="7" circle @input="getInfo"></v-pagination>
    </div>
  </v-card>
</template>

<script>
import { activityDraft } from '../../../../api/allVolunteer/public'
export default {
  data: () => ({
    selectedItem: 1,
    items: [],
    getAPI: {
      currPage: 1,
      pageNum: 0,
    },
  }),
  mounted() {
    this.getInfo()
  },
  methods: {
    apply(activityId0) {
      this.$router.push({ path: '/askFor', query: { activityId: activityId0 } })
    },
    getInfo() {
      activityDraft(this.getAPI)
        .then((res) => {
          this.items = res.data.list
          this.getAPI.pageNum = res.data.totalPage
        })
        .catch((err) => {
          this.$notify.error({
            title: '获取草稿箱失败',
          })
        })
    },
    timeData(time) {
      var nowTime = +new Date() //返回当前时间总的毫秒数
      var inputTime = +new Date(time)
      var times = (nowTime - inputTime) / 1000
      var mo = parseInt(times / 60 / 60 / 24 / 30),
        d = parseInt(times / 60 / 60 / 24),
        h = parseInt((times / 60 / 60) % 24),
        m = parseInt((times / 60) % 60)
      var rdata = ''
      if (mo > 0) {
        rdata = mo + '月前'
      } else {
        if (d > 0) {
          rdata = rdata + d + '天'
        } else {
          if (h != 0) {
            rdata = rdata + h + '小时'
          }
          if (m != 0) {
            rdata = rdata + m + '分钟'
          }
        }
        rdata = rdata + '前'
      }

      return rdata
    },
  },
}
</script>
<style scoped>
.display1 {
  font-size: 20px !important;
}
</style>