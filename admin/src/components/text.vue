<template>
<div>


    <Upload
    :show-upload-list="false"
    :on-success="handleSuccess"
    :format="['jpg','jpeg','png','gif']"
    :max-size="2048"
    multiple
    action="http://144.34.249.110:28002/api/upload/img"
    >
    <Button icon="ios-cloud-upload-outline" ></Button>
</Upload>
    <el-form >
<!-- <el-checkbox v-for"iitem in TagList" v-model="checked"></el-checkbox> -->
    <el-form-item label="标题" :label-width="formLabelWidth">
      <el-input v-model="title" placeholder="请输入标题"></el-input>
    </el-form-item>


<el-form-item label="分类" :label-width="formLabelWidth">
  <el-select v-model="type" filterable placeholder="请选择">
    <el-option
      v-for="item in typeList"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</el-form-item>


  <!-- Two-way Data-Binding -->
  <!-- <quill-editor
    v-model="content"
    :options="editorOption"
    ref="QuillEditor"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    
  /> -->


  <div class="example">
    <quill-editor
      class="editor"
      ref="QuillEditor"
      :value="content"
      :options="editorOption"
      @change="onEditorChange"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
    <div class="output code">
      <code class="hljs" v-html="contentCode"></code>
    </div>
    <div class="output ql-snow">
      <div class="ql-editor" v-html="content"></div>
    </div>
  </div>






      </el-form >
        <el-button type="primary" @click="sub">保存</el-button>
  <!-- Or manually control the data synchronization -->
  <!-- <quill-editor
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  /> -->
</div>
</template>

<script>
  import dedent from 'dedent'
  import hljs from 'highlight.js'
  import debounce from 'lodash/debounce'
  import { quillEditor } from 'vue-quill-editor'

  // highlight.js style
import 'highlight.js/styles/rainbow.css'

  // import theme style
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
   import { ImageDrop } from 'quill-image-drop-module'
 import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);
  // You can also register Quill modules in the component
//   import Quill from 'quill'
//   import someModule from '../yourModulePath/someQuillModule.js'
//   Quill.register('modules/someModule', someModule)
      // 工具栏配置
    const toolbarOptions = [
                   ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video'] ]


  export default {
    data () {
      return {
          formLabelWidth:'50px',
         img_domain : 'http://pic.toyfang.com',
         typeList : [{id:1,name:'个人生活'},{id:2,name:'英语'},{id:3,name:'php源码'},{id:4,name:'php'},{id:5,name:'c/c++'}],
         content: '',
         type: '',
         title: '',
        editorOption: {                
            modules: {
                      imageDrop: true,      //图片拖拽
          imageResize:{          //放大缩小
            displaySize: true
          },
                toolbar: {
                    container: toolbarOptions,  // 工具栏
                    handlers: {
                        'image': function (value) {
                            if (value) {
                                // 调用iview图片上传
                                document.querySelector('.ivu-upload .ivu-btn').click()
                            } else {
                                this.quill.format('image', false);
                            }
                        }
                    }
                },
                syntax:{
                    highlight: text => hljs.highlightAuto(text).value
                }
            }
        }
        
      }
    },
    methods: {
        sub(){
            var ts = this;
             this.$http.post('/article/addArticle', {data:{title:this.title,type:this.type,content:this.content}}).then(function (res) {
              if (res.data.code != 0) {
                ts.$message(res.data.msg)
              } else {
                  ts.$message({
                  type: 'success',
                  message: '添加成功!'
                });
              }
          })
            console.log(this.content)
        },
         handleSuccess (res) {
        // 获取富文本组件实例
                let quill = this.$refs.QuillEditor.quill
                //console.log(res);
                 if (res.code !== 0) {
                // 提示信息，需引入Message
                    Message.error('图片插入失败')
                } else if (res.data['img_path'] === undefined) {
                     Message.error('未返回路径')
                 }else{
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片，res为服务器返回的图片链接地址
                    quill.insertEmbed(length, 'image', this.img_domain + res.data['img_path'] )
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                 }
        },
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
       // console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
       // console.log('editor ready!', quill)
      },
        onEditorChange: debounce(function(value) {
            console.log(value.html)
             this.content = value.html
      }, 466),
    },
    computed: {
      editor() {

        return this.$refs.QuillEditor.quill
      },
       contentCode() {
        return hljs.highlightAuto(this.content).value
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>

<style scoped>
    .ivu-upload {
        display: none;
    }


</style>
<style >
    .edit_container {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .ql-editor{
         height:400px;
     }

</style>