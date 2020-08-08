<template>
<div>
  <el-container>
  <el-header>
    专辑名称：<el-input v-model="searchTitleValue" placeholder="名称" style="width:200px"></el-input>

<el-button type="success" @click="getList()" >搜索</el-button>
<el-button type="primary" @click="dialogTableVisible = true;" >添加专辑</el-button>
  </el-header>

<!-- ======================添加视频弹窗 start============================-->
<el-dialog title="添加专辑" :visible.sync="dialogTableVisible">

    <el-form :model="form">
<!-- <el-checkbox v-for"iitem in TagList" v-model="checked"></el-checkbox> -->
    <el-form-item label="专辑名" :label-width="formLabelWidth">
      <el-input v-model="form.title" placeholder="请输入专辑名称"></el-input>
    </el-form-item>
<el-form-item label="简介" :label-width="formLabelWidth"><el-input
  type="textarea"
  :rows="2"
  placeholder="请输入简介"
  v-model="form.desc">
  </el-input>
</el-form-item>

<el-form-item label="预览图" :label-width="formLabelWidth">
 <el-upload
  class="upload-demo"
  action="http://144.34.249.110:28002/api/upload/img"
  :on-preview="imgPreview"
  :on-remove="imgRemove"
  :on-success="handleOnImgSuccess"
  :file-list="form.imgList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <!-- <div slot="tip" class="el-upload__tip"></div> -->
</el-upload>
    </el-form-item>

<el-form-item label="推荐图" :label-width="formLabelWidth">
 <el-upload
  class="upload-demo"
  action="http://144.34.249.110:28002/api/upload/img"
  :on-preview="imgPreview"
  :on-remove="imgRemove"
  :on-success="handleOnImgTJSuccess"
  :file-list="form.img_tj"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <!-- <div slot="tip" class="el-upload__tip"></div> -->
</el-upload>
    </el-form-item>

       <el-form-item label="状态" :label-width="formRadioWidth">
        <el-radio v-model="form.status" label="1" border>启用</el-radio>
    <el-radio v-model="form.status" label="0" border>禁用</el-radio>
        </el-form-item>
               <el-form-item label="推荐" :label-width="formRadioWidth">
        <el-radio v-model="form.is_tj" label="1" border>是</el-radio>
    <el-radio v-model="form.is_tj" label="0" border>否</el-radio>
        </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
    <el-input-number v-model="form.sort" @change="handleChange" :min="1" :max="10" label="排序"></el-input-number>

    </el-form-item>
        <el-form-item >
    <el-button type="primary" @click="add" >添加</el-button>

      </el-form-item>
    </el-form>

  </el-dialog>
<!-- ======================添加视频弹窗 end============================-->

<!-- ======================编辑视频弹窗 start============================-->
<el-dialog title="编辑专辑" :visible.sync="editDialogTableVisible">

    <el-form :model="editForm">
<!-- <el-checkbox v-for"iitem in TagList" v-model="checked"></el-checkbox> -->
    <el-form-item label="专辑" :label-width="formLabelWidth">
      <el-input v-model="editForm.data.title" placeholder="请输入专辑名称"></el-input>
    </el-form-item>
<el-form-item label="简介" :label-width="formLabelWidth"><el-input
  type="textarea"
  :rows="2"
  placeholder="请输入简介"
  v-model="editForm.data.desc">
  </el-input>
</el-form-item>
<el-form-item label="预览图" :label-width="formLabelWidth">
 <el-upload
  class="upload-demo"
  action="http://144.34.249.110:28002/api/upload/img"
  :on-preview="imgPreview"
  :on-remove="imgRemove"
  :on-success="handleOnImgEditSuccess"
  :file-list="editForm.data.imgList_show"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <!-- <div slot="tip" class="el-upload__tip"></div> -->
</el-upload>
    </el-form-item>

<el-form-item label="推荐图" :label-width="formLabelWidth">
 <el-upload
  class="upload-demo"
  action="http://144.34.249.110:28002/api/upload/img"
  :on-preview="imgPreview"
  :on-remove="imgRemove"
  :on-success="handleOnImgEditTjSuccess"
  :file-list="editForm.data.img_tj_show"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <!-- <div slot="tip" class="el-upload__tip"></div> -->
</el-upload>
    </el-form-item>

       <el-form-item label="状态" :label-width="formRadioWidth">
        <el-radio v-model="editForm.data.status" label="1" border>启用</el-radio>
    <el-radio v-model="editForm.data.status" label="0" border>禁用</el-radio>
        </el-form-item>
               <el-form-item label="推荐" :label-width="formRadioWidth">
        <el-radio v-model="editForm.data.is_tj" label="1" border>是</el-radio>
    <el-radio v-model="editForm.data.is_tj" label="0" border>否</el-radio>
        </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
    <el-input-number v-model="editForm.data.sort" @change="handleChange" :min="1" :max="10" label="排序"></el-input-number>

        </el-form-item>

    <el-button type="primary" @click="edit">保存</el-button>

      </el-form-item>
    </el-form>

  </el-dialog>
<!-- ======================编辑视频弹窗 end============================-->

  <el-main>   <el-table
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
      label="专辑名"
      width="180">
    </el-table-column>
        <el-table-column
      prop="desc"
      label="简介"
      width="180">
    </el-table-column>
    <el-table-column
      prop="img_path"
      label="图片地址"
      width="360">
    </el-table-column>
        <el-table-column
      prop="tj_path"
      label="推荐地址"
      width="360">
    </el-table-column>
        <el-table-column
      prop="status"
      label="状态"
      width="150"
      :formatter="formatter">
    </el-table-column>
            <el-table-column
      prop="is_tj"
      label="推荐"
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
      :page-sizes="[20, 50, 100, 200]"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_num">
    </el-pagination>
  </div>
  </el-main>
</el-container>
</div>

</template>
<script>
export default {
  data () {
    // var TagList,
    return {
      currentPage: 1,
      total_num: 0,
      page_size: 3,
      formLabelWidth: '60px',
      formRadioWidth: '40px',
      dialogTableVisible: false,
      //   dialogFormVisible: false,

      editDialogTableVisible: false,
      //   EditdialogFormVisible: false,
      searchTitleValue: '', // 搜索的默认值

      tableData: [],
     // tagList: [],
     // albumList: [],
      searchForm: {
        where: {
          name: ['like', '%%']
        },
        need_total: 1,
        offset: 0, // 偏移量
        page: 1, // 分页
        page_size: 3, // 分页大小：默认10
        order: 'id desc' // 排序，默认id 倒序，规则为：字段+空格+“desc/asc”
      },
      form: {
        title: '',
        desc: '',
        imgList: [], // 图片列表

        img_tj: [],
        status: '1',
        sort: 0,
        is_tj: '0'
      },

      deleteForm: {
        where: {
          id: 0
        }
      },
      editForm: {
        where: {
          id: 0
        },
        data:{
          title: '',
          desc: '',
          imgList: [], // 图片列表
          imgList_show: [], // 图片列表

          img_tj: [],
          img_tj_show: [],
          status: '1',
          sort: 0,
          is_tj: '0'
        }
      }

    }
  },
  watch: {
    dialogTableVisible: function (v, old) {
      if (v === false) {
        this.form = {
          title: '',
          desc: '',
          imgList: [], // 图片列表

          img_tj: [],
          status: '1',
          sort: 0,
          is_tj: '0'
        }
      }
    },
    editDialogTableVisible: function (v, old) {
      if (v === false) {
        this.editForm = {
          where: {
            id: 0
          },
          data:{
            title: '',
            desc: '',
            imgList: [], // 图片列表
            imgList_show: [], // 图片列表

            img_tj: [],
            img_tj_show: [],
            status: '1',
            sort: 0,
            is_tj: '0'
          }

        }
      }
    },
    // 如果 `question` 发生改变，这个函数就会运行
    searchTitleValue: function (searchTitleValue, old) {
      // this.answer = 'Waiting for you to stop typing...'
      this.searchForm.where.title = ['like', '%' + this.searchTitleValue + '%']
      // this.debouncedGetAnswer()
    },
    page_size: function (v, old) {
      // this.answer = 'Waiting for you to stop typing...'
      this.searchForm.page_size = this.page_size
      // this.debouncedGetAnswer()
    },
    currentPage: function (v, old) {
      // this.answer = 'Waiting for you to stop typing...'
      this.searchForm.page = this.currentPage
      // this.debouncedGetAnswer()
    }
  },

  mounted () {
    this.getList()
  },
  methods: {
    handleChange () {},
    handleSizeChange (val) {
      this.page_size = val
      this.getList()
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
      console.log(`当前页: ${val}`)
    },

    handleOnImgSuccess (response, file, fileList) {
      console.log(response)
      if (response.code !== 0) {
        return this.$message.error(response.msg)
      } else if (response.data['img_path'] === undefined) {
        this.$message({
          message: '未返回图片路径',
          type: 'error',
          duration: 1000,
          onClose: () => {
            this.$refs.upload.clearFiles()
            this.getDataList()
          }
        })
      }
      this.form.imgList.push(response.data['img_path'])
    },
    handleOnImgTJSuccess (response, file, fileList) {
      console.log(response)
      if (response.code !== 0) {
        return this.$message.error(response.msg)
      } else if (response.data['img_path'] === undefined) {
        this.$message({
          message: '未返回图片路径',
          type: 'error',
          duration: 1000,
          onClose: () => {
            this.$refs.upload.clearFiles()
            this.getDataList()
          }
        })
      }
      this.form.img_tj.push(response.data['img_path'])
    },
    handleOnImgEditSuccess (response, file, fileList) {
      console.log(response)
      if (response.code !== 0) {
        return this.$message.error(response.msg)
      } else if (response.data['img_path'] === undefined) {
        this.$message({
          message: '未返回图片路径',
          type: 'error',
          duration: 1000,
          onClose: () => {
            this.$refs.upload.clearFiles()
            this.getDataList()
          }
        })
      }
      this.editForm.data.imgList_show.push(response.data['img_path'])
      this.editForm.data.imgList.push(response.data['img_path'])
    },
    handleOnImgEditTjSuccess (response, file, fileList) {
      console.log(response)
      if (response.code !== 0) {
        return this.$message.error(response.msg)
      } else if (response.data['img_path'] === undefined) {
        this.$message({
          message: '未返回图片路径',
          type: 'error',
          duration: 1000,
          onClose: () => {
            this.$refs.upload.clearFiles()
            this.getDataList()
          }
        })
      }
      this.editForm.data.img_tj_show.push(response.data['img_path'])
      this.editForm.data.img_tj.push(response.data['img_path'])
    },
    handleRemove (file, fileList) {
      console.log(file)
      var path = file.response.data['img_path']
      for (var i = 0; i < this.form.fileList.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (this.form.fileList[i] == path) {
          this.form.fileList.splice(i, 1)
        }
      }
    },
    handleEditRemove (file, fileList) {
      console.log(file)
      var path = file['url']
      for (var i = 0; i < this.editForm.data.fileList.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (this.editForm.data.fileList[i] == path) {
          this.editForm.data.fileList.splice(i, 1)
        }
      }
    },
    handlePreview (file) {
      console.log(file)
    },
    imgRemove (file, fileList) {
      console.log(file, fileList)
    },
    imgPreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 编辑
    handleEdit (index, row) {
      console.log(row)
      this.editDialogTableVisible = true
      this.editForm.where.id = row.id
      // this.editForm.albumValue = row.album_id
      this.editForm.data.title = row.name
      this.editForm.data.desc = row.desc
      this.editForm.data.status = row.status
      this.editForm.data.credit = row.credit
      this.editForm.data.is_tj = row.is_tj
      this.editForm.data.sort = row.order
      //JSON.parse(row.tags)
      if (row.img_path !== '') {
        this.editForm.data.imgList_show = row.img_path.map(item => {
          return {
            name: item,
            url: 'http://144.34.249.110:28002' + item
          }
        })
        this.editForm.data.imgList = row.img_path
      }

      this.editForm.data.img_tj = row.tj_path
      this.editForm.data.img_tj_show = row.tj_path.map(item => {
        return {
          name: item,
          url: item
        }
      })

      console.log(this.editForm)
      // console.log(index, row)
    },
    handleDelete (index, row) {
      var ts = this
      this.deleteForm.where.id = row.id
      this.$confirm('确定要删除该视频吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var ts = this
        this.$http.post('/album/delete', ts.deleteForm).then(function (res) {
          if (res.data.code != 0) {
            ts.$message(res.data.msg)
          } else {
            ts.getList()
            ts.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getList () {
      var ts = this
      this.$http.post('/album/Lists', ts.searchForm)
      // this.axios({
      //   method: 'post',
      //   url: 'http://144.34.249.110:28000/api/video/Lists',
      //   data: ts.searchForm,
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      //   }
      // })
        .then(function (res) {
          console.log(res.data.data.lists)
          if (res.data.code != 0) {
            ts.$message(res.data.msg)
          } else {
            var item = []

            ts.tableData = res.data.data.lists
            ts.total_num = res.data.data.total_num
          // console.log(ts.tableData)
          }
        })
    },

    // 添加视频
    add () {
      var ts = this
      this.$http.post('/album/addAlbum', {data: ts.form}).then(function (res) {
        // console.log(res.data.data.lists)
        if (res.data.code != 0) {
          ts.$message(res.data.msg)
        } else {
          ts.getList()
          ts.$message('添加成功')
        }
      })
    },

    // 编辑视频
    edit () {
      var ts = this
      this.$http.post('/album/update', ts.editForm).then(function (res) {
        if (res.data.code != 0) {
          ts.$message(res.data.msg)
        } else {
          ts.getList()
          ts.$message('修改成功')
        }
      })
    },
    cellStyle (row, column, rowIndex, columnIndex) { // 根据报警级别显示颜色
      // console.log(row.column);

      // console.log(row.column);
      if (row.row.status === '0' && row.column.label == '状态') {
        //   console.log('进来了')
        return 'color:red'
      } else if (row.row.status === '1' && row.column.label == '状态') {
        return 'color:green'
      }
    },
    formatter (row, column) {
      if (row.status == 1) {
        return '启用'
      } else {
        return '禁用'
      }
    }

  }
}
</script>
<style scoped>
.el-popover{
  text-align:start;
}
</style>
