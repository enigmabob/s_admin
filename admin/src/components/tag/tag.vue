<template>
<el-container>
  <el-header>
    标签名称：<el-input v-model="searchTitleValue" placeholder="名称" style="width:200px"></el-input>
  </el-select>
<el-button type="success" @click="getTagList()" >搜索</el-button>

<el-button type="primary" @click="dialogTableVisible = true;" >添加标签</el-button>
</el-header>
<!--===============================添加弹窗start=========================-->

<el-dialog title="添加标签" :visible.sync="dialogTableVisible">

    <el-form :model="form">
<!-- <el-checkbox v-for"iitem in TagList" v-model="checked"></el-checkbox> -->
    <el-form-item label="标签名" :label-width="formLabelWidth">
      <el-input v-model="form.name" placeholder="请输入标签"></el-input>
    </el-form-item>
    <el-form-item label="状态" :label-width="formLabelWidth">

    <el-radio v-model="form.status" label="1" border>启用</el-radio>
    <el-radio v-model="form.status" label="0" border>禁用</el-radio>

    </el-form-item>
        <el-form-item>
    <el-button type="primary" @click="onSubmit">添加</el-button>

      </el-form-item>
    </el-form>

  </el-dialog>

<!--===============================添加弹窗end=========================-->


<!--===============================编辑弹窗start=========================-->
<el-dialog title="编辑标签" :visible.sync="editDialogTableVisible">

<el-form :model="form">
<!-- <el-checkbox v-for"iitem in TagList" v-model="checked"></el-checkbox> -->
    <el-form-item label="标签名" :label-width="formLabelWidth">
      <el-input v-model="editForm.name" placeholder="请输入标签"></el-input>
    </el-form-item>
    <el-form-item label="状态" :label-width="formLabelWidth">

    <el-radio v-model="editForm.status" label="1" border>启用</el-radio>
    <el-radio v-model="editForm.status" label="0" border>禁用</el-radio>

    </el-form-item>
        <el-form-item>
    <el-button type="primary" @click="onEdit">保存</el-button>

      </el-form-item>
    </el-form>

  </el-dialog>

<!--===============================编辑弹窗end=========================-->
<el-main>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :cell-style="cellStyle">
    <el-table-column
      prop="id"
      label="id"
      width="50">
    </el-table-column>
    <el-table-column
      prop="name"
      label="标签名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="150"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      label="操作" width="180">
            <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="block">

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 50, 100, 200]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_num">
    </el-pagination>
  </div>
</el-main>
</el-container>
</template>
<script>
export default {
  data () {
    return {
      currentPage: 1,
      total_num: 0,
      page_size: 3,
      formLabelWidth: '60px',
      dialogTableVisible: false,
      searchTitleValue: '', // 搜索的默认值

      editDialogTableVisible: false,
      form: {
        name: '',
        status: '1'
      },

      editForm: {
        where:{
          id: 0
        },
        name: '',
        status: '1'
      },
      
      deleteForm: {
        where:{
          id: 0
        }
      },
      tableData: [],
      searchForm: {
        where: {
          name: ['like', '%%'],

        },
           need_total: 1,
           offset:0,//偏移量
           page:1,//分页
           page_size:3,//分页大小：默认10
           order:"id desc",//排序，默认id 倒序，规则为：字段+空格+“desc/asc”
      },
    }
  },  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    searchTitleValue: function (searchTitleValue, old) {
      //this.answer = 'Waiting for you to stop typing...'
      this.searchForm.where.name = ['like','%' + this.searchTitleValue+ '%']
     // this.debouncedGetAnswer()
    },
           page_size: function (v , old) {
      //this.answer = 'Waiting for you to stop typing...'
      this.searchForm.page_size = this.page_size
     // this.debouncedGetAnswer()
    },
      currentPage: function (v, old) {
      //this.answer = 'Waiting for you to stop typing...'
      this.searchForm.page =  this.currentPage
     // this.debouncedGetAnswer()
    }
    },
    
  mounted () {
    //this.getAlbumList()
    this.getTagList()
  },
  methods: {
      formatter(row, column) {
        if(row.status == 1){
          return '启用'
        }else{
          return '禁用'
        }
      },
    //编辑  
      handleEdit(index, row) {
        this.editDialogTableVisible = true
        this.editForm.name = row.name
        this.editForm.where.id = row.id
        this.editForm.status = row.status
      },
      // 删除
      handleDelete(index, row) {
        var ts = this;
        this.deleteForm.where.id = row.id
         this.$confirm('确定要删除该标签吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var ts = this
            this.$http.post('/tag/delete', ts.deleteForm).then(function (res) {

              if (res.data.code != 0) {
                ts.$message(res.data.msg)
              } else {
                ts.getTagList()
                  ts.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
          })
    
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
        })
      }
      ,
          handleSizeChange(val) {
        this.page_size = val
        this.getTagList()
       // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getTagList()
        console.log(`当前页: ${val}`);
      },
    onSubmit () {
      var ts = this
          this.$http.post('/tag/insert', ts.form).then(function (res) {
       // console.log(res)
        if (res.data.code != 0) {
          ts.$message(res.data.msg)
        } else {
         ts.getTagList()
          ts.$message('添加成功')
        }
      })
    },
        onEdit () {
      var ts = this
          this.$http.post('/tag/update', ts.editForm).then(function (res) {
        console.log(res)
        if (res.data.code != 0) {
          ts.$message(res.data.msg)
        } else {
         ts.getTagList()
          ts.$message('修改成功')
        }
      })
    },
    getTagList () {
      var ts = this

        this.$http.post('/tag/Lists', ts.searchForm
        ).then(function (res) {
        console.log(res.data.data.lists)
        if (res.data.code != 0) {
          ts.$message(res.data.msg)
        } else {
          var item = []
         // console.log(res.data.data.lists)

         ts.tableData = res.data.data.lists
          ts.total_num = res.data.data.total_num
          //console.log(ts.tableData)
        }
      })
    },
    cellStyle(row,column,rowIndex,columnIndex){//根据报警级别显示颜色
        // console.log(row.column);
     
        // console.log(row.column);
        if(row.row.status==="0" && row.column.label == "状态"){
       //   console.log('进来了')
          return 'color:red'
        }else if(row.row.status==="1" && row.column.label == "状态"){
          return 'color:green'
        }
      }
   
  }
}
</script>
