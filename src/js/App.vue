<template>
  <div>
    <h1>App</h1>
    <p v-if="loading">loading</p>
    <p v-for="error in errors.all()">
      {{ error }}
    </p>
    <p v-for="post in posts">
      {{ post.title }}
    </p>
    <form action="" @submit.prevent="onSubmit">
      <div>
        <input
          type="text"
          name="name"
          :value="form.values.name"
          @input="formOnUpdate('name', $event.target.value)"
          @focusout="formOnFocusOut('name')"
          placeholder="ユーザー名">
        <div v-if="form.shouldShowError.name">
          <p v-for="error in form.errors.name">
            {{ error }}
          </p>
        </div>
      </div>
      <div>
        <input
          type="email"
          name="email"
          :value="form.values.email"
          @input="formOnUpdate('email', $event.target.value)"
          @focusout="formOnFocusOut('email')"
          placeholder="メールアドレス">
        <div v-if="form.shouldShowError.email">
          <p v-for="error in form.errors.email">
            {{ error }}
          </p>
        </div>
      </div>
      <div>
        <input
          type="password"
          name="password"
          :value="form.values.password"
          @input="formOnUpdate('password', $event.target.value)"
          @focusout="formOnFocusOut('password')"
          placeholder="パスワード">
        <div v-if="form.shouldShowError.password">
          <p v-for="error in form.errors.password">
            {{ error }}
          </p>
        </div>
      </div>
      <div>
        <input
          type="password"
          name="passwordConf"
          :value="form.values.passwordConf"
          @input="formOnUpdate('passwordConf', $event.target.value)"
          @focusout="formOnFocusOut('passwordConf')"
          placeholder="パスワード">
        <div v-if="form.shouldShowError.passwordConf">
          <p v-for="error in form.errors.passwordConf">
            {{ error }}
          </p>
        </div>
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import InitializeDataUseCase from '@useCases/InitializeDataUseCase'
  import ExecutableMixin from '@mixins/ExecutableMixin'
  import Post from '@repositories/Post'
  import TestForm from '@viewModels/TestForm'

  export default {
    mixins: [ExecutableMixin, TestForm],
    data () {
      return {
        loading: false,
      }
    },
    methods: {
      errorHandler (e) {
        this.loading = false
        this.errors.add(e)
      },
      onSubmit () {
        if(this.formValidate()) {
          console.log('submit')
        }
      },
    },
    computed: {
      posts () {
        return Post.query().with('author').get()
      },
    },
    async created () {
      this.loading = true
      await this.execute(InitializeDataUseCase)
      this.loading = false
    },
  }
</script>
