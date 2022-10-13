const SibApiV3Sdk = require('sib-api-v3-sdk')
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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'

const sendEmail = async (toEmail, toName, subject, title, body) => {
  console.log({ toEmail, toName, subject, title, body })
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
    'sender': { 'email': 'liberman.daniel5@gmail.com', 'name': 'GyroCube Team' },
    'subject': `${subject}`,
    'htmlContent': `<!DOCTYPE html><html><body><h1>${title}</h1><p>${body}</p></body></html>`,
    'params': {
      'greeting': 'This is the default greeting',
      'headline': 'This is the default headline'
    },
    'messageVersions': [
      {
        'to': [
          {
            'email': `${toEmail}`,
            'name': `${toName}`
          }
        ]
      }]
  })
}


module.exports = { sendEmail }