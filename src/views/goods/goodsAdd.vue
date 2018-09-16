<template>
  <el-card class="card">
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 选项卡 -->
    <el-form ref="form" :model="formData"
      label-position="top"
      label-width="80px">
      <el-tabs tab-position="left"
        @tab-click="handletabclick"
        style="height: 100%;margin:10px 0">
        <el-tab-pane label="基本信息">
          {{formData}}
          <el-form-item label="商品名称">
            <el-input v-model="formData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="formData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="formData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formData.goods_number"></el-input>
          </el-form-item>
          {{selectedOptions}}
          <el-cascader
            clearable
            :options="options"
            expand-trigger="hover"
            v-model="selectedOptions"
            :props="{label: 'cat_name', value: 'cat_id', children: 'children'}"
          ></el-cascader>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form-item :label="item.attr_name"
            v-for="item in dynamicParams" :key="item.attr_id">
            <el-checkbox-group
              v-model="item.attr_vals">
              <el-checkbox
                v-for="val in item.attr_vals" :key="val"
                border :label="val"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form-item
            v-for="item in staticParams" :key="item.attr_id"
            :label="item.attr_name">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            :headers="headers"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      formData: {
        goods_cat:''
      },
      options: [],
      selectedOptions: [],
      dynamicParams:[],
      staticParams:[],
      fileList:[],
      headers:{
        Authorization: sessionStorage.getItem('token')
      }
    };
  },
  methods: {
    handletabclick (tab) {
      this.active = tab.index - 0
      //判断是否选择商品分类
      if (tab.index === '1' || tab.index === '2') {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning('请选择分类')
        } else {
        var sel = tab.index === '1' ? 'many' : 'only'
            this.loadParams(sel)
        }
      }
    },
    async loadData () {
      const res = await this.$http.post('/goods',formData)
    },
    async loadSelect () {
      const res = await this.$http.get('/categories?type=3')
      this.options = res.data.data
    },
    async loadParams (sel) {
      const res = await this.$http.get(`/categories/${this.selectedOptions[2]}/attributes?sel=${sel}`)
      console.log(res)
      if (sel === 'many') {
        this.dynamicParams = res.data.data
        this.dynamicParams.forEach((item) => {
        item.attr_vals = item.attr_vals.length === '' ? [] : item.attr_vals.split(',')
        })
      } else {
        this.staticParams = res.data.data
      }
    },
    handleSuccess (response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      
    },
    handleRemove (file, fileList) {
      console.log(response);
      console.log(file);
    }
  },
  created () {
      this.loadSelect()
    }
}
</script>

<style>
.el-step__title {
  font-size: 12px
}
</style>
