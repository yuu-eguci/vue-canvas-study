vue-canvas-study
===

Vue.js + Vuetify + Canvas の手書き練習。 GitHub Pages で公開してる。

- Docker: 対応!
- Node.js: 24!
- Linter: ESLint (neostandard + eslint-plugin-vue)!
- Test: Vitest + @vue/test-utils!
- Vue: 3.5!
- Vuetify: 4.3!
- vue-drawing-canvas: 1.0!
- アイコン: @mdi/js (SVG)!

![readme](https://user-images.githubusercontent.com/28250432/156100825-3b508633-b26a-47d3-9fc2-992f5e06d90e.png)

## パッと実行してみたい

```bash
docker compose up --build
# http://localhost:5173/vue-canvas-study/
```

## 開発コマンド

```bash
docker compose run --rm app npm run lint
docker compose run --rm app npm test
docker compose run --rm app npm run build
```

- Node.js 24 が手元にあれば `npm ci` してから `npm run dev` などを直接実行してもいい

- PR と main への push で GitHub Actions の `ci` が lint 、 test 、 build を実行する

## GitHub Pages へのデプロイ

- main に push しても deploy されない
- Actions の `cd-github-pages` を手動で実行すると gh-pages ブランチへ deploy される
- 公開先: https://yuu-eguci.github.io/vue-canvas-study/
