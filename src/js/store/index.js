import Vue from 'vue'
import Vuex from 'vuex'
import VuexOrm from '@vuex-orm/core'

Vue.use(Vuex)

// import models
import User from '@models/User'
import Post from '@models/Post'
import Comment from '@models/Comment'

const memoryDb = new VuexOrm.Database()

// modules
const users = {}
const posts = {}
const comments = {}

memoryDb.register(User, users)
memoryDb.register(Post, posts)
memoryDb.register(Comment, comments)

const store = new Vuex.Store({
  plugins: [VuexOrm.install(memoryDb)],
  modules: {
    provider: {},
  },
})

export default store
