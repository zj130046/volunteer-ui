<template>
  <div>
    <v-card v-if="isActivityPlanning">
      <v-col cols="12">
        <v-btn
          color="primary"
          style="float: right"
          @click="downloadActivityPanning"
          >导出活动策划书</v-btn
        >
      </v-col>
      <v-list flat>
        <v-subheader>活动策划详情</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-icon> 活动名称 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.activityName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动主办方 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.sponsor
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动承办方 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.contractor
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动目的 </v-list-item-icon>
            <v-list-item-content
              >{{ activityPlanning.activityPurpose }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动背景 </v-list-item-icon>
            <v-list-item-content>
              {{ activityPlanning.activityBackground }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动意义 </v-list-item-icon>
            <v-list-item-content>
              {{ activityPlanning.activitySignificance }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动开始时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.activityStartTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动结束时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.activityEndTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动地点 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.activityAddress
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动时长 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.activityDuration
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动对象 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.activityObject
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动参与人员 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.activityParticipants
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动参与人员数量 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.activityParticipantsNumber
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动内容 </v-list-item-icon>
            <v-list-item-content>
              {{ activityPlanning.activityContent }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 服务队自行解决的物资 </v-list-item-icon>
            <v-list-item-content>
              <p
                v-for="(item, index) in activityPlanning.activityResource"
                :key="index"
              >
                {{ item.name + " : " + item.number }}
              </p>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 需要总队协助解决的物资 </v-list-item-icon>
            <v-list-item-content>
              <p
                v-for="(item, index) in activityPlanning.activityResourceNeed"
                :key="index"
              >
                {{ item.name + " : " + item.number }}
              </p>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动准备阶段 </v-list-item-icon>
            <v-list-item-content>
              {{ activityPlanning.activityProcess }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动举办阶段 </v-list-item-icon>
            <v-list-item-content>
              {{ activityPlanning.activityProcessHolding }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动后续阶段 </v-list-item-icon>
            <v-list-item-content>
              {{ activityPlanning.activityLaterPhases }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 经费预算 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.activityFunds
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动安全 </v-list-item-icon>
            <v-list-item-content>
              {{ activityPlanning.activitySafe }}
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-icon> 创建时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.createTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 上次更新时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityPlanning.updateTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="topbottom" v-if="isActivityApplication">
      <v-col cols="12">
        <v-btn
          color="primary"
          style="float: right"
          @click="downloadActivityApplication"
          >导出志愿服务活动申请表</v-btn
        >
      </v-col>
      <v-list flat>
        <v-subheader>志愿服务活动申请详情</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-icon> 组织单位 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityApplication.contractor
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 项目名称 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityApplication.activityName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动地点 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityApplication.activityAddress
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityApplication.activityDuration
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 项目内容 </v-list-item-icon>
            <v-list-item-content>
              {{ activityApplication.activityContent }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 项目负责人 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityApplication.personInCharge
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 联系电话 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityApplication.phone
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-icon> 创建时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityApplication.createTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 上次更新时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                activityApplication.updateTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="topbottom" v-if="isClassApplication">
      <v-col cols="12">
        <v-btn
          color="primary"
          style="float: right"
          @click="downloadClassApplication"
          >导出班级活动申请表</v-btn
        >
      </v-col>
      <v-list flat>
        <v-subheader>班级活动申请详情</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-icon> 班级 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                classApplication.className
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动名称 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                classApplication.activityName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                classApplication.activityStartTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动地点 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                classApplication.activityAddress
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动人数 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                classApplication.activityParticipantsNumber
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动时长 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                classApplication.activityDuration
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 是否长期 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                classApplication.activityTermTag
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动内容 </v-list-item-icon>
            <v-list-item-content>
              {{ classApplication.activityContent }}
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-icon> 创建时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                classApplication.createTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 上次更新时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                classApplication.updateTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="topbottom" v-if="isLongtermRegister">
      <v-col cols="12">
        <v-btn
          color="primary"
          style="float: right"
          @click="downloadLongtermRegister"
          >导出志愿服务长期项目登记表</v-btn
        >
      </v-col>
      <v-list flat>
        <v-subheader>志愿服务长期项目登记详情</v-subheader>
        <v-list-item-group color="primary">
          <h4>一、志愿服务项目</h4>
          <v-list-item>
            <v-list-item-icon> 项目名称 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.activityName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h5>负责人</h5>
          <v-list-item>
            <v-list-item-icon> 姓名 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.personInCharge
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 学院班级 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.collegeAndClass
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 联系电话 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.phone
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h4>二、项目基本信息</h4>
          <v-list-item>
            <v-list-item-icon> 人数 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.activityParticipantsNumber
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 服务时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.activityDuration
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h5>开展频率</h5>
          <v-list-item>
            <v-list-item-icon> 每周次数 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.timeWeek
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 每月次数 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.timeMonth
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h5>基地信息</h5>
          <v-list-item>
            <v-list-item-icon> 服务基地是否挂牌 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.listed
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 挂牌名称 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.listedName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h5>项目类别</h5>
          <v-list-item>
            <v-list-item-icon> 项目类别 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.projectCategory
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h5>开展时间</h5>
          <v-list-item>
            <v-list-item-icon> 开始时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.activityStartTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 结束时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.activityEndTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h5>项目简介</h5>
          <v-list-item>
            <v-list-item-icon> 工作内容 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.jobContent
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 能力要求 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.capabilityRequirements
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h4>三、志愿服务接收单位</h4>
          <h5>志愿服务接收单位基本信息</h5>
          <v-list-item>
            <v-list-item-icon> 地址 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.address
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 邮编 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.postcode
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 乘车方式 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.modeOfTravel
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 其他基本信息 </v-list-item-icon>
            <v-list-item-content>
              {{ longtermRegister.more }}
            </v-list-item-content>
          </v-list-item>
          <h5>接收单位负责人信息</h5>
          <v-list-item>
            <v-list-item-icon> 负责人 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.personInChargeTwo
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 联系电话 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.phoneTwo
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 邮箱 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ longtermRegister.mail }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h5>接收单位服务对象</h5>
          <v-list-item>
            <v-list-item-icon> 服务对象 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.serviceObject
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 服务对象数量 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                longtermRegister.serviceObjectNumber
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="topbottom" v-if="isPlaceApprove">
      <v-col cols="12">
        <v-btn
          color="primary"
          style="float: right"
          @click="downloadPlaceApprove"
          >导出保卫处场地审批表</v-btn
        >
      </v-col>
      <v-list flat>
        <v-subheader>保卫处场地审批详情</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-icon> 学生组织、社团名称 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                placeApprove.contractor
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动名称 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                placeApprove.activityName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                placeApprove.activityTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动地点 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                placeApprove.activityAddress
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动人数 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                placeApprove.activityParticipantsNumber
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 负责人、联系电话 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                placeApprove.personInCharge + " " + placeApprove.phone
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动内容 </v-list-item-icon>
            <v-list-item-content>
              {{ placeApprove.activityContent }}
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-icon> 创建时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                placeApprove.createTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 上次更新时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                placeApprove.updateTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="topbottom" v-if="isBaseRegister">
      <v-col cols="12">
        <v-btn
          color="primary"
          style="float: right"
          @click="downloadBaseRegister"
          >导出志愿者服务基地登记表</v-btn
        >
      </v-col>
      <v-list flat>
        <v-subheader>志愿者服务基地登记详情</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-icon> 基地名称 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ baseRegister.baseName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h4>一、负责人信息</h4>
          <v-list-item>
            <v-list-item-icon> 姓名 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                baseRegister.personInCharge
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 学院班级 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                baseRegister.collegeAndClass
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 联系电话 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ baseRegister.phone }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 邮箱 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ baseRegister.mail }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h4>二、项目基本信息</h4>
          <h5>单次活动开展规模</h5>
          <v-list-item>
            <v-list-item-icon>人数 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                baseRegister.activityParticipantsNumber
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 服务时间 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.activityDuration }}
            </v-list-item-content>
          </v-list-item>
          <h5>开展频率</h5>
          <v-list-item>
            <v-list-item-icon> 每周次数 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.timeWeek }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 每月次数 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.timeMonth }}
            </v-list-item-content>
          </v-list-item>
          <h5>基地信息</h5>
          <v-list-item>
            <v-list-item-icon> 服务基地是否挂牌 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.listed }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 挂牌时间 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.listedTime }}
            </v-list-item-content>
          </v-list-item>
          <h5>项目类别</h5>
          <v-list-item>
            <v-list-item-icon> 项目类别 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.projectCategory }}
            </v-list-item-content>
          </v-list-item>
          <h5>开展时间</h5>
          <v-list-item>
            <v-list-item-icon> 开始时间 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.activityStartTime }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 结束时间 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.activityEndTime }}
            </v-list-item-content>
          </v-list-item>
          <h5>项目简介</h5>
          <v-list-item>
            <v-list-item-icon> 项目简介 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.projectBrief }}
            </v-list-item-content>
          </v-list-item>
          <h4>三、志愿服务基地信息</h4>
          <h5>志愿服务基地基本信息</h5>
          <v-list-item>
            <v-list-item-icon> 地址 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.address }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 邮编 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.postcode }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 乘车方式 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.modeOfTravel }}
            </v-list-item-content>
          </v-list-item>
          <h5>服务基地简介</h5>
          <v-list-item>
            <v-list-item-icon> 服务基地简介 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.introductionOfServiceBase }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 邮编 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.postcode }}
            </v-list-item-content>
          </v-list-item>
          <h5>基地负责人信息</h5>
          <v-list-item>
            <v-list-item-icon> 负责人 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.personInChargeTwo }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 所在单位及职务 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.unitAndPosition }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 联系电话 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.phoneTwo }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 邮编 </v-list-item-icon>
            <v-list-item-content>
              {{ baseRegister.postcode }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 邮箱 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ baseRegister.mailTwo }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-icon> 上次更新时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                baseRegister.updateTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-card class="topbottom" v-if="isPersonalApprove">
      <v-col cols="12">
        <v-btn
          color="primary"
          style="float: right"
          @click="downloadPersonalApprove"
          >导出假期个人活动申请表</v-btn
        >
      </v-col>
      <v-list flat>
        <v-subheader>假期个人活动申请详情</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-icon> 申请人学号 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                personalApprove.studentNum
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 申请人姓名 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                personalApprove.studentName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h4>一、活动信息</h4>
          <v-list-item>
            <v-list-item-icon> 活动名称 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                personalApprove.activityName
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 学院班级 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                personalApprove.collegeAndClass
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动时间 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                personalApprove.activityTime
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动时长 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                personalApprove.activityDuration
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <h4>二、活动地点</h4>
          <v-list-item>
            <v-list-item-icon>活动地点 </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{
                personalApprove.activityAddress
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动地点图片 </v-list-item-icon>
            <v-list-item-content>
              <img
                :src="personalApprove.addressPic"
                alt="加载失败"
                style="width: 100%"
              />
            </v-list-item-content>
          </v-list-item>
          <h4>三、活动内容</h4>
          <v-list-item>
            <v-list-item-icon> 活动目的 </v-list-item-icon>
            <v-list-item-content>
              {{ personalApprove.activityPurpose }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动意义 </v-list-item-icon>
            <v-list-item-content>
              {{ personalApprove.activitySignificance }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动对象 </v-list-item-icon>
            <v-list-item-content>
              {{ personalApprove.activityObject }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon> 活动内容 </v-list-item-icon>
            <v-list-item-content>
              {{ personalApprove.activityContent }}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";

import {
  getActivityInfoTable,
  getactivityTable,
} from "../../api/allVolunteer/public";
import { CNDateString, getDate } from "../../utils/date";
export default {
  data() {
    return {
      activityId: 0,
      //需要加载的表的ID
      tableIdList: [],
      isActivityPlanning: false,
      activityPlanning: {},
      downloadActivityPlanning: {},
      isActivityApplication: false,
      activityApplication: {},
      isClassApplication: false,
      classApplication: {},
      isLongtermRegister: false,
      longtermRegister: {},
      isPlaceApprove: false,
      placeApprove: {},
      isBaseRegister: false,
      baseRegister: {},
      isPersonalApprove: false,
      personalApprove: {},
    };
  },
  created() {
    this.activityId = this.$route.params.id;
    this.getActivityInfoTable();
  },
  methods: {
    //管理员获得活动详细信息
    async getActivityInfoTable() {
      await getActivityInfoTable({ activityId: this.activityId }).then(
        async (res) => {
          if (res.code == 0) {
            this.tableIdList = res.data.tablesNeedToSubmit;
            console.log(this.tableIdList);
            for (let i = 0; i < this.tableIdList.length; i++) {
              switch (this.tableIdList[i]) {
                case 1:
                  this.isActivityPlanning = true;
                  await getactivityTable({
                    activityId: this.activityId,
                    tableId: 1,
                  }).then((res) => {
                    this.activityPlanning = res.data;
                    this.downloadActivityPlanning = res.data;
                  });
                  if (this.activityPlanning.activityResource)
                    this.activityPlanning.activityResource = JSON.parse(
                      this.activityPlanning.activityResource
                    );
                  if (this.activityPlanning.activityResourceNeed)
                    this.activityPlanning.activityResourceNeed = JSON.parse(
                      this.activityPlanning.activityResourceNeed
                    );
                  break;
                case 2:
                  this.isActivityApplication = true;
                  await getactivityTable({
                    activityId: this.activityId,
                    tableId: 2,
                  }).then((res) => {
                    this.activityApplication = res.data;
                  });
                  break;
                case 3:
                  this.isClassApplication = true;
                  await getactivityTable({
                    activityId: this.activityId,
                    tableId: 3,
                  }).then((res) => {
                    this.classApplication = res.data;
                  });
                  break;
                case 4:
                  this.isLongtermRegister = true;
                  await getactivityTable({
                    activityId: this.activityId,
                    tableId: 4,
                  }).then((res) => {
                    this.longtermRegister = res.data;
                  });
                  break;
                case 5:
                  this.isPlaceApprove = true;
                  await getactivityTable({
                    activityId: this.activityId,
                    tableId: 5,
                  }).then((res) => {
                    this.placeApprove = res.data;
                  });
                  break;
                case 6:
                  this.isBaseRegister = true;
                  await getactivityTable({
                    activityId: this.activityId,
                    tableId: 6,
                  }).then((res) => {
                    this.baseRegister = res.data;
                    console.log(res.data);
                  });
                  break;
                case 7:
                  this.isPersonalApprove = true;
                  await getactivityTable({
                    activityId: this.activityId,
                    tableId: 7,
                  }).then((res) => {
                    this.personalApprove = res.data;
                    console.log(res.data);
                  });
              }
            }
          }
        }
      );
    },
    //导出活动策划书
    downloadActivityPanning() {
      let ownList = this.downloadActivityPlanning.activityResource;
      let needList = this.downloadActivityPlanning.activityResourceNeed;
      let resourceList = [];
      let i = 0;
      while (ownList[i] || needList[i]) {
        resourceList[i] = {};
        resourceList[i].ownName = ownList[i] ? ownList[i].name : "";
        resourceList[i].ownNum = ownList[i] ? ownList[i].number : "";
        resourceList[i].needName = needList[i] ? needList[i].name : "";
        resourceList[i].needNum = needList[i] ? needList[i].number : "";
        i++;
      }
      this.downloadActivityPlanning.resourceList = resourceList;
      this.downloadActivityPlanning.createTime = CNDateString(
        getDate(this.downloadActivityPlanning.createTime.slice(0, 10))
      );
      console.log(this.downloadActivityPlanning);
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "activityPlanning.docx",
        function (error, content) {
          // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater().loadZip(zip);
          // 设置模板变量的值
          // console.log(that.wordData)
          doc.setData({
            ...that.downloadActivityPlanning,
          });

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(
            out,
            that.downloadActivityPlanning.activityName + "活动策划书.docx"
          );
        }
      );
    },
    //导出志愿服务活动申请表
    downloadActivityApplication() {
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "activityApplication.docx",
        function (error, content) {
          // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater().loadZip(zip);
          // 设置模板变量的值
          // console.log(that.wordData)
          doc.setData({
            ...that.activityApplication,
          });

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(
            out,
            that.activityApplication.activityName + "志愿服务活动申请表.docx"
          );
        }
      );
    },
    //导出班级活动申请表
    downloadClassApplication() {
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "classApplication.docx",
        function (error, content) {
          // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater().loadZip(zip);
          // 设置模板变量的值
          // console.log(that.wordData)
          doc.setData({
            ...that.classApplication,
          });

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(
            out,
            that.classApplication.activityName + "班级活动申请表.docx"
          );
        }
      );
    },
    //导出志愿服务长期项目登记表
    downloadLongtermRegister() {
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "longtermRegister.docx",
        function (error, content) {
          // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater().loadZip(zip);
          // 设置模板变量的值
          // console.log(that.wordData)
          doc.setData({
            ...that.longtermRegister,
          });

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(
            out,
            that.longtermRegister.activityName + "志愿服务长期项目登记表.docx"
          );
        }
      );
    },
    //导出保卫处场地审批表
    downloadPlaceApprove() {
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "placeApprove.docx",
        function (error, content) {
          // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater().loadZip(zip);
          // 设置模板变量的值
          // console.log(that.wordData)
          doc.setData({
            ...that.placeApprove,
          });

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(out, that.placeApprove.activityName + "保卫处场地审批表.docx");
        }
      );
    },
    //导出志愿者服务基地登记表
    downloadBaseRegister() {
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "baseRegister.docx",
        function (error, content) {
          // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater().loadZip(zip);
          // 设置模板变量的值
          // console.log(that.wordData)
          doc.setData({
            ...that.baseRegister,
          });

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(
            out,
            that.baseRegister.activityName + "志愿者服务基地登记表.docx"
          );
        }
      );
    },
    base64DataURLToArrayBuffer(dataURL) {
      const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
      if (!base64Regex.test(dataURL)) {
        return false;
      }
      const stringBase64 = dataURL.replace(base64Regex, "");
      let binaryString;
      if (typeof window !== "undefined") {
        binaryString = window.atob(stringBase64);
      } else {
        binaryString = new Buffer(stringBase64, "base64").toString("binary");
      }
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes.buffer;
    },
    //导出假期个人活动申请表
    downloadPersonalApprove() {
      this.$notify.success({
        title: "图片文件较大",
        message: "请稍等几秒钟",
      });
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        "personalApprove.docx",
        async function (error, content) {
          // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
          // 抛出异常
          if (error) {
            throw error;
          }

          var ImageModule = require("docxtemplater-image-module-free");

          async function dataURLToBase64(url) {
            return new Promise(function (resolve, reject) {
              const Img = new Image();
              Img.src = url + "?v=" + Math.random(); //处理缓存
              Img.crossOrigin = "*";
              // Img.setAttribute('crossOrigin', 'anonymous');
              let dataURL = "";
              Img.onload = function () {
                const canvas = document.createElement("canvas");
                canvas.width = Img.width;
                canvas.height = Img.height;
                canvas
                  .getContext("2d")
                  .drawImage(Img, 0, 0, Img.width, Img.height);
                // 将图片绘制到canvas中
                dataURL = canvas.toDataURL("image/png");
                // 转换图片为dataURL
                resolve(dataURL);
              };
            });
          }

          let myImage = await dataURLToBase64(that.personalApprove.addressPic);
          // console.log(myImage)

          //构造图片解析
          const imageOpts = {
            getImage() {
              return that.base64DataURLToArrayBuffer(myImage);
            },
            getSize() {
              return [600, 400];
            },
            centered: true,
          };

          var ImageModule = new ImageModule(imageOpts);

          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          var doc = new docxtemplater(zip, {
            modules: [ImageModule],
          });
          // 设置模板变量的值
          // console.log(that.wordData)
          doc.setData({
            ...that.personalApprove,
          });

          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(
            out,
            that.personalApprove.activityName + "假期个人活动申请表.docx"
          );
        }
      );
    },
  },
};
</script>

<style scoped>
.v-list-item__icon {
  width: 100px !important;
  font-weight: 600;
}
h1,
h2,
h3,
h4,
h5 {
  margin-left: 20px;
}

.topbottom {
  margin-top: 20px;
}
</style>