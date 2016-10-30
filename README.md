# movinglight-js

ムービングライトをnodejsで制御する

## 概要
scenesフォルダに、jsで記述されたスクリプトを書く。

oscサーバーに発火したいsceneを知らせると、sceneスクリプトに応じて、oscまたはdmx信号を送付して、ムービングライトを制御する。

## todo
- [x] scene function の設計。return するのか、thisに書くのか 判断 [2016/10/30 (日) 13:17]
  - movingライトやdmxを送れるclassをrequireするのが賢いと思う
- [x] sceneの外部ファイル化 [2016/10/30 (日) 11:38]
  まずは組み込み関数とか抜きで、普通に外部化して読み込もう
- [x] oscでファイル名を指定して発火 [2016/10/30 (日) 11:38]
- [ ] node-serialportを試す
- [ ] evalはやめて、特定の関数群をrequire
  - [ ] ファイルをコンバートするかんじで

- 関数群
  - sendDmx(ch, val);
  - MovingObject Class
    - setColor
    - setDimmer
    - setPan, setTilt
    - 

## future
スクリプトの変更の自動検知→発火
複数スクリプトの並行処理（ムービングを一度に全部制御するのではなく、別ファイルにしたり、しなかったりを楽にできるようにする）
外部変数の読込（oscでリアルタイムに送られてくる座標をsceneに入れる

あんまプログラムできない人向けの組み込み関数みたいなの→ファイル書かせて、前にファイルを結合したい  複数requireはある。

