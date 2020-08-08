<template>
<div>
  <el-container>
  <el-header>
    视频名称：<el-input v-model="searchTitleValue" placeholder="名称" style="width:200px"></el-input>
    所属专辑：  <el-select v-model="searchForm.where.album_id" filterable placeholder="请选择">
    <el-option
      v-for="item in albumList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

<el-button type="success" @click="getVideoList()" >搜索</el-button>
<el-button type="primary" @click="dialogTableVisible = true;" >添加视频</el-button>
  </el-header>

<!-- ======================添加视频弹窗 start============================-->
<el-dialog title="添加视频" :visible.sync="dialogTableVisible">

    <el-form :model="form">
<!-- <el-checkbox v-for"iitem in TagList" v-model="checked"></el-checkbox> -->
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="form.title" placeholder="请输入标题"></el-input>
    </el-form-item>
<el-form-item label="简介" :label-width="formLabelWidth"><el-input
  type="textarea"
  :rows="2"
  placeholder="请输入简介"
  v-model="form.desc">
  </el-input>
</el-form-item>

<el-form-item label="专辑" :label-width="formLabelWidth">
  <el-select v-model="form.albumValue" filterable placeholder="请选择">
    <el-option
      v-for="item in albumList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

</el-form-item>

    <el-checkbox-group v-model="form.tag">
<el-form-item label="标签" :label-width="formLabelWidth">
       <el-checkbox-button  v-for="item in tagList"  :label="item.id" :key="item.id">{{item.name}}</el-checkbox-button>

</el-form-item>
    </el-checkbox-group>

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

<el-form-item label="视频" :label-width="formLabelWidth">
    <el-upload
  class="upload-demo"
  action="http://144.34.249.110:28002/api/upload/img2"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :on-success="handleOnSuccess"
  :file-list="form.fileList">
  <el-button size="small" type="primary">添加视频</el-button>
  <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
       <el-form-item label="状态" :label-width="formLabelWidth">
        <el-radio v-model="form.status" label="1" border>启用</el-radio>
    <el-radio v-model="form.status" label="0" border>禁用</el-radio>
        </el-form-item>
            <el-form-item label="积分" :label-width="formLabelWidth">
      <el-input v-model="form.credit" placeholder="观看所需积分" style="width:50px"></el-input>
    </el-form-item>
        <el-form-item >
    <el-button type="primary" @click="addVideo" >添加</el-button>

      </el-form-item>
    </el-form>

  </el-dialog>
<!-- ======================添加视频弹窗 end============================-->



<!-- ======================编辑视频弹窗 start============================-->
<el-dialog title="编辑视频" :visible.sync="editDialogTableVisible">

    <el-form :model="editForm">
<!-- <el-checkbox v-for"iitem in TagList" v-model="checked"></el-checkbox> -->
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="editForm.title" placeholder="请输入标题"></el-input>
    </el-form-item>
<el-form-item label="简介" :label-width="formLabelWidth"><el-input
  type="textarea"
  :rows="2"
  placeholder="请输入简介"
  v-model="editForm.desc">
  </el-input>
</el-form-item>

<el-form-item label="专辑" :label-width="formLabelWidth">
  <el-select v-model="editForm.albumValue" filterable placeholder="请选择">
    <el-option
      v-for="item in albumList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

</el-form-item>

    <el-checkbox-group v-model="editForm.tag">
<el-form-item label="标签" :label-width="formLabelWidth">
       <el-checkbox-button  v-for="item in tagList"  :label="item.id" :key="item.id">{{item.name}}</el-checkbox-button>

</el-form-item>
    </el-checkbox-group>

<el-form-item label="预览图" :label-width="formLabelWidth">
 <el-upload
  class="upload-demo"
  action="http://144.34.249.110:28002/api/upload/img"
  :on-preview="imgPreview"
  :on-remove="imgRemove"
  :on-success="handleOnImgEditSuccess"
  :file-list="editForm.imgList_show"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <!-- <div slot="tip" class="el-upload__tip"></div> -->
</el-upload>
    </el-form-item>

<el-form-item label="视频" :label-width="formLabelWidth">
    <el-upload
  class="upload-demo"
  action="http://144.34.249.110:28002/api/upload/img2"
  :on-preview="handlePreview"
  :on-remove="handleEditRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :on-success="handleOnEditSuccess"
  :file-list="editForm.fileList_show">
  <el-button size="small" type="primary">添加视频</el-button>
  <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
           <el-form-item label="状态" :label-width="formLabelWidth">
        <el-radio v-model="editForm.status" label="1" border>启用</el-radio>
    <el-radio v-model="editForm.status" label="0" border>禁用</el-radio>
        </el-form-item >
            <el-form-item label="积分" :label-width="formLabelWidth">
      <el-input v-model="editForm.credit" placeholder="观看所需积分" style="width:50px"></el-input>
    </el-form-item>
        <el-form-item>
    <el-button type="primary" @click="editVideo">保存</el-button>

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
      prop="_Album.name"
      label="所属专辑"
      width="180">
    </el-table-column>
        <el-table-column
      prop="title"
      label="名称"
      width="180">
    </el-table-column>
        <el-table-column
      prop="desc"
      label="简介"
      width="180">
    </el-table-column>
        <el-table-column
      prop="video_path"
      label="视频地址"
      width="180">
    </el-table-column>
    <el-table-column
      prop="img_path"
      label="图片地址"
      width="360">
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
      dialogTableVisible: false,
   //   dialogFormVisible: false,

      editDialogTableVisible: false,
   //   EditdialogFormVisible: false,
      searchTitleValue: '', // 搜索的默认值

      tableData: [],
      tagList: [],
      albumList: [],
      searchForm: {
        where: {
          title: ['like', '%%'],
          album_id: ''
        },
           need_total: 1,
           offset:0,//偏移量
           page:1,//分页
           page_size:3,//分页大小：默认10
           order:"id desc",//排序，默认id 倒序，规则为：字段+空格+“desc/asc”
      },
      form: {
        albumValue: '',
        title: '',
        desc: '',
        imgList: [], // 图片列表
        tag: [],
        fileList: [],
        status: '1',
        credit: 0
      },
            
      deleteForm: {
        where:{
          id: 0
        }
      },
      editForm: {
        where:{
          id: 0
        },
        albumValue: '',
        title: '',
        desc: '',
        imgList: [], // 图片列表
        imgList_show: [], // 图片列表
        tag: [],
        fileList_show: [],   
        fileList: [],
        status: '1',
        credit: 0
     }

    }
  },
  watch: {
    dialogTableVisible: function (v, old) {
        if(v === false){
          this.form = {   
         albumValue: '',
        title: '',
        desc: '',
        imgList: [], // 图片列表
        tag: [],
        fileList: [],
        status: '1',
        credit: 0
          }
        }
  
    },
     editDialogTableVisible: function (v, old) {
       if(v === false){
          this.editForm = {  
            where:{
              id:0
            },
            albumValue: '',
            title: '',
            desc: '',
            imgList: [], // 图片列表
            imgList_show: [], // 图片列表
            tag: [],
            fileList_show: [],
            fileList: [],
            status: '1',
            credit: 0
          }
        }
    },
    // 如果 `question` 发生改变，这个函数就会运行
    searchTitleValue: function (searchTitleValue, old) {
      //this.answer = 'Waiting for you to stop typing...'
      this.searchForm.where.title = ['like','%' + this.searchTitleValue+ '%']
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
    this.getAlbumList()
    this.getTagList()
    this.getVideoList()
  },
  methods: {

      handleSizeChange(val) {
        this.page_size = val
        this.getVideoList()
       // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getVideoList()
        console.log(`当前页: ${val}`);
      },

    handleOnSuccess (response, file, fileList) {
      console.log(response)
      if (response.code !== 0) {
        return this.$message.error(response.msg)
      } else if (response.data['img_path'] === undefined) {
        this.$message({
          message: '未返回视频路径',
          type: 'error',
          duration: 1000,
          onClose: () => {
            this.$refs.upload.clearFiles()
            this.getDataList()
          }
        })
      }
      this.form.fileList.push(response.data['img_path'])
      console.log(fileList)
    },
     handleOnEditSuccess (response, file, fileList) {

      if (response.code !== 0) {
        return this.$message.error(response.msg)
      } else if (response.data['img_path'] === undefined) {
        this.$message({
          message: '未返回视频路径',
          type: 'error',
          duration: 1000,
          onClose: () => {
            this.$refs.upload.clearFiles()
            this.getDataList()
          }
        })
      }
      this.editForm.fileList_show.push(response.data['img_path'])
      this.editForm.fileList.push(response.data['img_path'])
 
      console.log(fileList)
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
            this.editForm.imgList_show.push(response.data['img_path'])
      this.editForm.imgList.push(response.data['img_path'])
 
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
      for (var i = 0; i < this.editForm.fileList.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (this.editForm.fileList[i] == path) {
          this.editForm.fileList.splice(i, 1)
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

//编辑  
      handleEdit(index, row) {
        console.log(row)
        this.editDialogTableVisible = true
        this.editForm.where.id = row.id
        this.editForm.albumValue = row.album_id
        this.editForm.title = row.title
        this.editForm.desc = row.desc
        this.editForm.status = row.status
        this.editForm.credit = row.credit
        this.editForm.tag = JSON.parse(row.tags)
        if(row.img_path !== ''){
            this.editForm.imgList_show = row.img_path.map(item => {
          return {
            name: item,
            url: 'http://144.34.249.110:28002' + item
          }})
          this.editForm.imgList = row.img_path
      }
 


       this.editForm.fileList = row.video_path
        this.editForm.fileList_show = row.video_path.map(item => {
       return {
         name: item,
         url: item
       }
 })

        console.log(this.editForm)
      //console.log(index, row)

      },
      handleDelete(index, row) {
        var ts = this;
        this.deleteForm.where.id = row.id
         this.$confirm('确定要删除该视频吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var ts = this
            this.$http.post('/video/delete', ts.deleteForm).then(function (res) {
              if (res.data.code != 0) {
                ts.$message(res.data.msg)
              } else {
                ts.getVideoList()
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
      },
    getVideoList () {
      var ts = this
             this.$http.post('/video/Lists', ts.searchForm)
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
          console.log(res.data.data.lists)
          for(var i=0; i< res.data.data.lists.length ;i++){
          //  console.log(item);
            res.data.data.lists[i]['albumName']  = res.data.data.lists[i]['_Album']['name']
           // ts.tableData.push(item);
          }
         ts.tableData = res.data.data.lists
          ts.total_num = res.data.data.total_num
          //console.log(ts.tableData)
        }
      })
    },

    getTagList () {
      var ts = this
       this.$http.post('/tag/Lists', {
          where: {
            status: '1'
          }
        }).then(function (res) {
        console.log(res.data.data.lists)
        if (res.data.code != 0) {
          ts.$message(res.data.msg)
        } else {
          ts.tagList = res.data.data.lists
          console.log(ts.tagList)
        }
      })
      // 获取Tag列表
    },
    getAlbumList () {
      var ts = this
      this.$http.post('album/Lists', {}).then(function (res) {
        console.log(res.data.data.lists)
        if (res.data.code != 0) {
          ts.$message(res.data.msg)
        } else {
          ts.albumList = res.data.data.lists
          console.log(ts.tagList)
        }
      })
      // 获取Tag列表
    },

    //添加视频
    addVideo () {
      var ts = this
      this.$http.post('video/addVideo',{data: ts.form}).then(function (res) {
        // console.log(res.data.data.lists)
        if (res.data.code != 0) {
           ts.$message(res.data.msg)
        } else {
          ts.getVideoList()
          ts.$message("添加成功")
        }
      })
    },

    //编辑视频
      editVideo () {
      var ts = this
      this.$http.post('/video/update', ts.editForm).then(function (res) {
        if (res.data.code != 0) {
          ts.$message(res.data.msg)
        } else {
         ts.getVideoList()
          ts.$message('修改成功')
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
      },
         formatter(row, column) {
        if(row.status == 1){
          return '启用'
        }else{
          return '禁用'
        }
      },
   
  
  }
}
</script>
<style scoped>
.el-popover{
  text-align:start;
}
</style>
