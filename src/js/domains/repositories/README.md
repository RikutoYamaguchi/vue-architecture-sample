# Repository

## Repository層の役割

1. メモリ上に乗っている値を取得・更新など
2. Infrastructure層を使って外部データへのアクセス

## Repository層の実装

### Model層を継承したクラス

```javascript
class Post extends PostModel {
```

### Model層からEntityを取るようなメソッドを実装

```javascript
static getIsPublic() {
  return Post.query().where('isPublic', true).get()
}
```

### メンバ変数にシングルトンにしたInfrastructure層を持つ

```javascript
const infrastructure = new Infrastructure();

class Post extends PostModel {
  constructor() {
    super();
    this.infrastructure = infrastructure;
  }
}
```