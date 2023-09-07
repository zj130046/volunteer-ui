<template>
<div>
  <v-data-table
              :headers="headers"
              :items="getPassActivityInfo"
              hide-default-footer
              sort-by="calories"
              class="elevation-1 body"
              disable-pagination
            >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="askForVolunteer(item)"
            >
              iconfont vo-xinxi
            </v-icon>
          </template>
          <span>志愿者招募</span>
        </v-tooltip>
      </template>
    </v-data-table>
            <div class="text-center">
              <v-pagination
                v-model="getPassActivityForm.currPage"
                :length="totalPage"
                :total-visible="7"
                circle
                @input="getPassActivityList"
              ></v-pagination>
            </div>
</div>
</template>
<script>
import { getPassActivity } from "../../../api/admin/recruit";
export default {
    data(){
        return{
          headers:[
           {
        text: "活动ID",
        align: "start",
        sortable: false,
        value: "activityId",
      },
      { text: "活动名称", value: 'activityName', sortable: false },
      { text: "开始时间", value: "activityStartTime", sortable: false },
      { text: "结束时间", value: "activityEndTime", sortable: false },
      { text: "活动类别", value: "category", sortable: false },
      { text: "志愿组织", value: "organization", sortable: false },
      { text: "届别", value: "level", sortable: false },
      { text: "申请者", value: "crater", sortable: false },
      { text: "通过人", value: "authenticator", sortable: false },
      { text: "申请时间", value: "createTime", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
          ],
            // 审核通过活动的列表
            getPassActivityInfo:[],
            pageSize:'',
            totalPage:0,
            // 页面对象
            getPassActivityForm:{
                currPage:1
            }

        };  
    },
    created(){
     this.getPassActivityList()
    },
    methods:{
      // 审核通过数据列表
    async getPassActivityList(){
        await getPassActivity(this.getPassActivityForm).then((res)=>{
          if(res.code==0){
            this.getPassActivityInfo = res.data.list;
            this.totalPage = res.data.totalPage;
            // console.log(this.getPassActivityInfo)
          }
        })
    },
    // 点击志愿者招募跳转页面
    askForVolunteer(item){
        this.$router.push({
        path: "/askForV",
        query: { activityId: item.activityId },
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.body {
  margin: 0 0 20px 2px;
  padding: 5px 15px 5px 15px;
}
.mb-2 {
  margin-top: 10px;
}
.v-card__text {
  font-size: 16px;
  span {
    float: right;
  }
}
</style>