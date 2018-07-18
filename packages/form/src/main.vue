<template>
  <div class="from-container pull-auto">
    <el-form ref="form"
             :model="form"
             :label-position="option.labelPosition"
             :label-width="setPx(option.labelWidth,80)"
             :rules="formRules">
      <el-row :gutter="20"
              :span="24">
        <template v-for="(column,index) in option.column">
          <el-col :span="column.span||12">
            <el-form-item :label="column.label"
                          :prop="column.prop"
                          :label-width="setPx(column.labelWidth,option.labelWidth || 80)">
              <slot :value="form[column.prop]"
                    :column="column"
                    :dic="setDic(column.dicData,DIC[column.dicData])"
                    :name="column.prop"
                    v-if="column.formsolt"></slot>
              <component :is="getComponent(column.type)"
                         :props="column.props || option.props"
                         v-else
                         v-model="form[column.prop]"
                         :precision="column.precision"
                         :multiple="column.multiple"
                         :placeholder="column.placeholder"
                         :step="column.step"
                         :controls-position="column.controlsPosition"
                         :expand-trigger="column.expandTrigger"
                         :filterable="column.filterable"
                         :separator="column.separator"
                         :border="column.border"
                         :min="column.min"
                         :max="column.max"
                         :label="column.label"
                         :clearable="column.clearable"
                         :type="column.type"
                         :minRows="column.minRows"
                         :maxRows="column.maxRows"
                         :dic="setDic(column.dicData,DIC[column.dicData])"
                         :disabled="column.disabled"
                         :format="column.format"
                         :value-format="column.valueFormat"
                         @change="column.cascader?change(index):''"></component>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="24"
                v-if="vaildData(option.submitBtn,true)">
          <el-form-item label-width="0">
            <div class="form-menu"
                 :class="menuPostion">
              <el-button type="primary"
                         @click="submit">{{vaildData(option.submitText,'提交')}}</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import crud from "../../mixins/crud";
import { validatenull } from "../../utils/validate.js";
export default {
  name: "AvueForm",
  mixins: [crud()],
  components: {},
  data () {
    return {
      first: true,
      form: {},
      formRules: {}
    };
  },
  created () {

  },
  mounted () { },
  computed: {
    menuPostion: function () {
      if (this.option.submitPostion) {
        return "is-" + this.option.submitPostion;
      } else {
        return "is-center";
      }
    }
  },
  props: {
    value: {
      type: Object,
      required: true,
      default: {}
    }
  },
  methods: {
    rulesInit () {
      this.formRules = {};
      this.option.column.forEach(ele => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules;
      });
    },
    change (index) {
      const column = this.option.column;
      const list = column[index].cascader;
      const prop = column[index].prop;
      const url = column[index + 1].dicUrl;
      const type = column[index + 1].dicData;
      if (!this.first) {
        list.forEach((ele) => {
          this.form[ele] = '';
          this.DIC[ele] = [];
        })
      }
      this.GetDicByType(url.replace('{{key}}', this.form[prop])).then(res => {
        let data = res;
        this.DIC[type] = data;
        this.DIC = Object.assign({}, this.DIC);
      });
    },
    formInit () {
      let formObj = this.formInitVal(this.option.column);
      let form = Object.assign({}, this.value)
      for (let o in form) {
        formObj.tableForm[o] = form[o];
      }
      this.form = Object.assign({}, formObj.tableForm);
      for (let i = 0; i < this.option.column.length; i++) {
        const ele = this.option.column[i];
        if (ele.cascaderFirst) {
          const cascader = [].concat(ele.cascader)
          const cascaderLen = ele.cascader.length - 1;
          if (!validatenull(this.form[ele.prop])) this.change(i);
          for (let j = 0; j < cascaderLen; j++) {
            const cindex = i + (j + 1);
            const cele = this.option.column[cindex];
            cele.cascader = cascader.slice(cindex);
            if (!validatenull(this.form[cele.prop])) this.change(cindex);
          }
        }
      }
      this.first = false;
    },
    formVal () {
      for (let o in this.value) {
        this.form[o] = this.value[o];
      }
      this.$emit("input", this.form);
    },
    submit () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("submit", this.form);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.from-container {
  padding: 8px 10px;
}
.form-menu {
  width: 100%;
  &.is-center {
    text-align: center;
  }
  &.is-left {
    text-align: left;
  }
  &.is-right {
    text-align: right;
  }
}
</style>
