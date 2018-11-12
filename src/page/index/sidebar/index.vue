<template>
  <div class="avue-sidebar"
       :class="{'is-active':isCollapse}">
    <logo :isCollapse="isCollapse"></logo>
    <el-scrollbar style="height:100%">
      <el-menu unique-opened
               :default-active="nowTagValue"
               mode="vertical"
               :show-timeout="200"
               background-color="rgb(0, 20, 42)"
               text-color="rgba(255,255,255,0.7)"
               :collapse="isCollapse">
        <sidebar-item :menu="menu"
                      :props="website.menu.props"
                      :collapse="isCollapse"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import MENU from '@/mock/menu'
import { mapGetters } from 'vuex'
import SidebarItem from './sidebarItem'
import logo from './logo'
export default {
  name: 'sidebar',
  components: { SidebarItem, logo },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('GetMenu').then(data => { })
  },
  computed: {
    ...mapGetters(['menu', 'tag', 'isCollapse', 'website']),
    nowTagValue: function () { return this.$router.$avueRouter.getValue(this.$route) }
  },
  mounted () { },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>

