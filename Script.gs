function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('MLH Fellowship GitHub Invites')
      .addItem('Invite All Fellows to GitHub', 'inviteFellows')
      .addToUi();
}

function inviteFellows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const values = sheet.getDataRange().getValues()
  const headers = values[0];
  const GITHUB_ACCESS_TOKEN = "FILL ME IN";
  const GITHUB_USERNAME = "MLHProgram";
  const GITHUB_ORG = "MLH-Fellowship"
  const UsernameIndex = headers.indexOf('Fellow GitHub Username');
  const StatusIndex = headers.indexOf('Status');

  for (let i = 1; i < values.length; i++) {
    var gh_username = values[i][0]
    var id_url = 'https://api.github.com/users/' + encodeURIComponent(gh_username)
    var id_response = UrlFetchApp.fetch(id_url);
    Logger.log(id_response)
    var data = JSON.parse(id_response.getContentText())
    var auth = {
      "Authorization": "Basic " + Utilities.base64Encode(GITHUB_USERNAME + ":" + GITHUB_ACCESS_TOKEN)
    }
    var options = {
      "method": "post",
      "headers": auth,
      "contentType": 'application/json',
      "payload": JSON.stringify({"invitee_id": data.id}),
    }
    Logger.log(options)
    var invite_url = 'https://api.github.com/orgs/' + GITHUB_ORG + '/invitations'
    try {
      var invite_response = UrlFetchApp.fetch(invite_url, options)
      Logger.log(invite_response)
      sheet.getRange(i + 1, StatusIndex + 1).setValue("Success")
    } catch (e) {
      Logger.log(e)
      sheet.getRange(i + 1, StatusIndex + 1).setValue(e)
    }
  }
}