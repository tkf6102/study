<template>
  <div id="nav">
    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="search">课程</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="friends-o">个人</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
</style>
