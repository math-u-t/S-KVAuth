// code.jsではなく、code.gsです。

function doGet(e) {
  const EMAIL = Session.getActiveUser().getEmail() || "none";

  try {
    log_record(EMAIL, 200);
    let templateObj = {};
    return returnHTML(templateObj, "index")
  } catch (error) {
    log_record(EMAIL, 503);
    let templateObj = {};
    return returnHTML(templateObj, "error")
  }
}

function log_record(userEmail, status) {
  const now = new Date();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("アクセスログ");

  const lastRow = sheet.getLastRow() + 1;
  sheet.getRange(lastRow, 1).setValue(now);
  sheet.getRange(lastRow, 2).setValue(userEmail);
  sheet.getRange(lastRow, 3).setValue(status);
}

// スクリプトプロパティ関数
function sc_props(value) {
  return(PropertiesService.getScriptProperties().getProperty(value))
}

// htmlをテンプレートとして返す関数
function returnHTML(templateObj, file) {
  // メインテンプレートの設定と変数注入
  const mainTemplate = HtmlService.createTemplateFromFile(file);
  for (const key in templateObj) {
    mainTemplate[key] = templateObj[key];
  }

  // link.html もテンプレートとして展開
  const linkTemplate = HtmlService.createTemplateFromFile("link.js");
  for (const key in templateObj) {
    linkTemplate[key] = templateObj[key]; // 同じ変数を注入
  }

  // テンプレート評価（HTML文字列として取得）
  const mainHtml = mainTemplate.evaluate().getContent();
  const linkHtml = linkTemplate.evaluate().getContent();

  // 結合して出力
  const finalHtml = mainHtml + linkHtml;

  const output = HtmlService.createHtmlOutput(finalHtml)
    .setTitle("google-lite-auth")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setFaviconUrl(sc_props("favicon"))
    .addMetaTag("google-site-verification", "google-lite-auth");

  return output;
}

//  ページ遷移関数
function getAppUrl() {
  return ScriptApp.getService().getUrl();
}