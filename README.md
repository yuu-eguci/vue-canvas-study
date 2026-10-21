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
docker compose up --build --renew-anon-volumes
# http://localhost:5173/vue-canvas-study/
```

## できること

- canvas に手書きする。幅が 300px より狭い画面では 3:2 のまま縮む
- Draw / Eraser: ペンと消しゴムを切り替える
- Undo / Redo: 直前の線を戻す、やり直す
    - キーボードなら Ctrl (Mac は Cmd) + Z で Undo 、 Ctrl+Y か Ctrl+Shift+Z で Redo 。入力欄にいるときは入力欄の Undo になる
- Reset: 線と背景画像を全部消す
- Download: canvas を JPEG で保存する
- Set image A / B: 背景に五角形 / 六角形のガイド画像を敷く
- 数値と文字列 (20 文字まで) を入力して、ボタンで console.info に出す

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
