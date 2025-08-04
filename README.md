# Google Lite Login

**Google Lite Login** は、Google Cloud を利用せずに「Googleでログイン」の機能を実現する方法です。

>[!IMPORTANT]
>## 注意点
>
>- 本物のOAuth認証ではないため、セキュリティや正規性が求められる場面では不適切な場合があります。
>- あくまで「簡易的なGoogleログイン」用途に向いています。

## プロジェクト構成 ##

| ディレクトリ / ファイル名 | 内容 |
| - | - |
| `/src/` | フレームワーク(現在はLink.gs) |
| `/public/` | htmlファイル |
| `/functions/` | サーバーサイドのコード(`.gs`コード) |
| `/config/` | 設定ディレクトリ |
| `/docs/` | ドキュメントディレクトリ |
| `README.md` | このリポジトリの概要と開発ルール |

## システム概要

このシステムは以下の構成で動作します

1. **Google Apps Script（GAS）** を利用して、ユーザーの **Googleアカウント情報（メールアドレスなど）** を[取得](docs/GAS-Spec.md)します。
2. 取得した情報は、**Firebase Functions（API）** に送信され、必要な処理（ユーザー認証や登録など）を行います。
3. これにより、Google Cloud Console を使った OAuth 設定なしで、Googleアカウントを用いたログイン機能を簡易的に実現できます。

## 使用技術

- GoogleAppsScript（`code.gs`）
- Firebase Functions（APIサーバー）

## メリット

- Google Cloud Consoleの煩雑な設定が不要
- 軽量かつ素早く「Googleでログイン」風の認証が実装可能
- クライアントから直接GASを呼び出すため、認証処理がシンプル