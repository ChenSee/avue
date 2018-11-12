<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <el-menu-item v-if="validatenull(item[childrenKey]) && vaildRoles(item)"
                    :index="item[pathKey]"
                    @click="open(item)"
                    :key="item[labelKey]"
                    :class="{'is-active':nowTagValue===item[pathKey]}">
        <i :class="item[iconKey]"></i>
        <span slot="title">{{item[labelKey]}}</span>
      </el-menu-item>
      <el-submenu v-else-if="!validatenull(item[childrenKey])&&vaildRoles(item)"
                  :index="item[pathKey]"
                  :key="item[labelKey]">
        <template slot="title">
          <i :class="item[iconKey]"></i>
          <span slot="title"
                :class="{'el-menu--display':collapse}">{{item[labelKey]}}</span>
        </template>
        <template v-for="(child,cindex) in item[childrenKey]">
          <el-menu-item :index="child[pathKey],cindex"
                        @click="open(child)"
                        :class="{'is-active':nowTagValue===child[pathKey]}"
                        v-if="validatenull(child[childrenKey])"
                        :key="child[labelKey]">
            <i :class="child[iconKey]"></i>
            <span slot="title">{{child[labelKey]}}</span>
          </el-menu-item>
          <sidebar-item v-else
                        :menu="child[childrenKey]"
                        :key="cindex"
                        :props="props"
                        :collapse="collapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { validatenull } from '@/util/validate';
export default {
  name: 'sidebarItem',
  data () {
    return {
      config: {
        propsDefault: {
          label: 'label',
          path: 'path',
          icon: 'icon',
          children: 'children'
        }
      }
    }
  },
  props: {
    menu: {
      type: Array
    },
    props: {
      type: Object,
      default: () => { return {} }
    },
    collapse: {
      type: Boolean
    }
  },
  created () {
  },
  mounted () { },
  computed: {
    ...mapGetters(['roles']),
    labelKey () { return this.props.label || this.config.propsDefault.label },
    pathKey () { return this.props.path || this.config.propsDefault.path },
    iconKey () { return this.props.icon || this.config.propsDefault.icon },
    childrenKey () { return this.props.children || this.config.propsDefault.children },
    nowTagValue () { return this.$router.$avueRouter.getValue(this.$route) }
  },
  methods: {
    vaildRoles (item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true
    },
    validatenull (val) {
      return validatenull(val);
    },
    open (item) {
      this.$router.push({
        path: this.$router.$avueRouter.getPath({
          name: item[this.labelKey],
          src: item[this.pathKey]
        }),
        query: item.query
      })
    }
  }
}
</script>

