import Form from '@viewModels/Form'

export default Form({
  values: {
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  },
  rules: {
    name: 'required',
    email: 'required|email',
    password: 'required|between:3,10',
    passwordConf: 'required|confirmed:password',
  },
  messages: {
    'name.required': '名前は必須です。',
    'email.required': 'メールアドレスは必須です。',
    'email.email': 'メールアドレスの形式が間違っています。',
    'password.required': 'パスワードは必須です。',
    'password.between': 'パスワードは3文字以上10文字以下です。',
    'passwordConf.required': 'パスワード確認は必須です。',
    'passwordConf.confirmed': 'パスワード確認がパスワードと違います。',
  }
})
