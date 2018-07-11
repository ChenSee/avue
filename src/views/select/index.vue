<template>
  <div>
    <basic-container>
      <avue-form :option="option"
                 v-model="form"
                 @submit="handleSubmit"></avue-form>
    </basic-container>
  </div>
</template>

<script>
import option from '@/const/select/selectOption'
export default {
  data () {
    return {
      option: option,
      form: {
        "xiaoqu": 1,
        "louyu": 1,
        "danyuan": 2,
        "fangjian": 2,
        "renyuan": 1
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    handleSubmit (form) {
      this.form = form;
      this.$message({
        message: form,
        type: "success"
      });
    }
  }
}
</script>

<style>
</style>
