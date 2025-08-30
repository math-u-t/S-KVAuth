function doGet(e) {
  const session_id = random(30);
  const EMAIL = Session.getActiveUser().getEmail() || "cantauth";
  console.log("session = " + session_id)

  const auth_data = {
    id: EMAIL,
    auth: 'AUTHENTICATE_CODE',
    name: session_id,
    score: 'math-u-t'
  };

  const template = HtmlService.createTemplateFromFile("index");

//  auth_session(auth_data)
  return template.evaluate()
    .setTitle("S-KVAuth")
    .setFaviconUrl("SOMETHING_ICON_URL")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
}

function auth_session(content) {
  const url = "YOUR_CLOUDFLARE_URL";

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(content),
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
  } catch (err) {
    Logger.log("Worker送信エラー: " + err);
  }
}

function random(length) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charsLength = chars.length;
  const result = [];
  
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    // 範囲内でランダムインデックスを取得
    const idx = randomValues[i] % charsLength;
    result.push(chars[idx]);
  }
  
  return result.join('');
}