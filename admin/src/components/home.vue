<template>
<el-container style="height: 100%; border: 1px solid #eee">
    <el-header style="background-color:#409EFF">Bob</el-header>
     <el-container>
  <el-aside width="200px" style="background-color: #409EFF">
     <el-menu ><!--:default-openeds="['1', '3']" -->
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>视频管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link to="/addVideo">视频管理</router-link></el-menu-item>

        </el-menu-item-group>
      </el-submenu>
          <el-submenu index="2" >
      <template slot="title" ><i class="el-icon-message" ></i>标签管理</template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="/tag">标签管理</router-link></el-menu-item>

        </el-menu-item-group>
      </el-submenu>
                <el-submenu index="3" >
      <template slot="title" ><i class="el-icon-message" ></i>专辑管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><router-link to="/album">专辑管理</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-main><router-view></router-view></el-main>
     </el-container>
 <!-- <el-container>
     <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <el-main>
      <router-view></router-view>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container> -->
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }

</style>

<script>
export default {
  data () {
    // eslint-disable-next-line no-unused-vars
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      // tableData: Array(20).fill(item)
    }
  }
}
</script>
