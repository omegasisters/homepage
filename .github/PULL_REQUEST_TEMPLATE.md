<!-- あくまでテンプレートなので必ずしもすべての項目を埋めなくてよい -->
<!-- This is just a template. You don't have to follow -->

<!-- タイトルは変更の内容が他の人にも伝わるように1行でまとめる。 -->

## 変更内容: Summary

<!-- 何故変更したか、これが取り込まれると何が嬉しいか、何が解決されるのか、など詳細な内容を記載 -->

## 確認事項: Check point

<!-- PRを作成するとチェックボックスになります、もしくは [x] にするとチェック状態になります。 -->

- [ ] PR を作成する前に、 https://github.com/omegasisters/homepage の最新の master を取り込み済みである。
  - Conflict や他の方の変更で自分の変更が動かなくなる可能性を防ぎます。
  - 最新の master を取り込む方法
    - upstream に fork 元リポジトリを追加
      - `git remote add upstream git@github.com:omegasisters/homepage.git`
    - 現在のブランチに `upstream` の `master` を取り込む
      - `$ git pull --rebase upstream master`
  - おまけ
    - rebase 後に再度 `push` する場合、 `--force-with-lease` オプションをつける
      - `git push --force-with-lease origin <ブランチ名>`
- [ ] 動作確認済みである。
  - 何らかの理由で本番に取り込まれるまで確認できない場合はその旨を補足に記載する。
- [ ] prettier によるコード整形を行った、もしくは画面に関係ない変更である。
  - 可能な方のみで良いと思いますが、意図せず他の方がフォーマットするとコード差分が増えすぎるので自分の分は自分でやるのがよろしいかと思います。
- [ ] スマホ（狭い画角）でも表示を確認した、もしくは画面に関係ない変更である。
- [ ] 他の方の変更を意図せず削除・変更していないか、差分をもう一度確認した。
- [ ] 破壊的な変更を行った場合、影響範囲をもう一度確認した。もしくは破壊的な変更を行っていない。
- [ ] Pull Request に関連した issue の URL を貼り付けた

## 補足: Other Information

<!-- レビューをする際に特に見てほしい点、懸念・注意点、など 画像とかあるとわかりやすいかも！ -->
