<template>
  <div
    id="EPGuide"
    v-show="currentElement && visible && !completed"
  >
    <a-popover
      :visible="visible"
      title="温馨提示"
    >
      <template #content>
        <div class="w200">{{ currentItem.tip }}</div>
        <div class="flex-between mt5">
          <div>{{ active + 1 }}/{{ tipList.length }}</div>
          <div>
            <a-button
              @click="skip"
              size="small"
              type="link"
              v-if="(tipList.length > 1) && (active + 1 !== tipList.length) "
            >跳过</a-button>
            <a-button
              @click="nextTip"
              size="small"
              type="primary"
            >{{ active + 1 === tipList.length ? '完成' : '下一步' }}</a-button>
          </div>
        </div>
      </template>
      <div
        :style="TIPStyle"
        class="EPGuide-TIP"
        ref="tip"
      ></div>
    </a-popover>
  </div>
</template>

<script>
import { setStorage, getStorage } from '@/methods'
export default {
  name: 'EPGuide',
  props: {
    tipList: {
      type: Array,
      default: () => ([]),
      validator: (val) => {
        const flag = val.every(item => {
          if (!(item.$el instanceof Node)) return false
          return true
        })
        return flag
      }
    },
    tipID: String
  },
  computed: {
    keyword () {
      return this.tipID || this.$route.name
    },
    completed () {
      return getStorage('Guide') && getStorage('Guide').includes(this.keyword)
    },
    currentElement () {
      return this.tipList[this.active] && this.tipList[this.active].$el
    },
    currentItem () {
      return this.tipList[this.active] || {}
    }
  },
  watch: {
    active (newVal) {
      if (newVal === -1) return this.visible = false
      if (newVal >= this.tipList.length) return this.skip()
      this.visible = true
    },
    currentElement (newVal, oldVal) {
      if (this.completed) return
      if (!(newVal instanceof Node)) return false
      if (oldVal)
        oldVal.className = oldVal.className.split(' ')
          .filter(item => item !== 'currentGuide').join(' ')

      newVal.scrollIntoView()
      newVal.className = newVal.className + ' currentGuide'

      if (this.timeID) {
        clearInterval(this.timeID)
        this.timeID = null
      }

      this.visible = true
      this.getPosition(newVal)
    }
  },
  data () {
    return {
      active: 0,
      visible: false,
      TIPStyle: {}
    }
  },
  created () {
  },
  methods: {
    getStorage,
    getPosition (el) {
      if (this.timeID) return
      let loop = () => {
        let { left, top } = el.getBoundingClientRect()
        const { offsetHeight, offsetWidth } = el
        this.TIPStyle = {
          left: left + 'px',
          top: top + 'px',
          width: offsetWidth + 'px',
          height: offsetHeight + 'px'
        }
      }
      loop()
      this.timeID = setInterval(loop, 500)
    },
    skip () {
      let tipArr = getStorage('Guide') || []
      tipArr.push(this.keyword)
      setStorage('Guide', tipArr)
      this.active = -1
      this.visible = false
    },
    nextTip () {
      this.active++
    },
  },
  beforeDestroy () {
    clearInterval(this.timeID)
  }
}
</script>

<style lang="less" scoped>
#EPGuide {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  z-index: 999;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;

  .EPGuide-TIP {
    background-color: #fff;
    position: absolute;
    visibility: hidden;
  }
}
</style>
<style >
.currentGuide {
  position: relative;
  z-index: 1000;
}
</style>
