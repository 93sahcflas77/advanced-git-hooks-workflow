# 📧 Nodemailer Complete Guide (Advanced)

## Environment Variables (.env)

```js
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your_email@gmail.com
    SMTP_PASS=your_password
```

## 🚀 1. Create Test Account

```js
const nodemailer = require('nodemailer');
const createAccount = await nodemailer.createTestAccount();
```

### createAccount output

```js
    user: 'abc123@ethereal.email',
    pass: 'password123',

    smtp: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false
    },

    imap: {
        host: 'imap.ethereal.email',
        port: 993,
        secure: true
    },

    pop3: {
        host: 'pop3.ethereal.email',
        port: 995,
        secure: true
    },

    web: 'https://ethereal.email'
```

## ⚙️ 2. Create Transporter

```js
const transporter = nodemailer.createTransport({
  host: '',
  port: '',
  secure: '',
  service: 'email', // shortcut host , port and secire combine
  auth: {
    user: createAccount.user,
    pass: createAccount.pass,
  },

  // OAuth2 Authentication
  auth: {
    type: 'OAuth2',
    user: '',
    clientId: '',
    clientSecret: '',
    refreshToken: '',
    accessToken: '',
    expires: '',
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: false,
    minVersion: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
  rateLimit: 10,
  rateDelta: 1000,
  logger: true,
  debug: false,
});
```

## 🔄 4. Middleware Hooks

```js
mail.data = {
  from,
  to,
  cc,
  bcc,
  replyTo,

  subject,
  text,
  html,

  attachments,
  alternatives,

  headers,

  date,
  messageId,
  priority,

  envelope,
  encoding,

  icalEvent,
  amp,
};

//  example
//  access
console.log(mail.data.to);
console.log(mail.data.subject);

// Modify mail.data (Main Use Case)
mail.data.subject = 'New Subject'; // change subject
mail.data.html += '<p>Footer</p>'; // mpdify HTML
mail.data.headers = {
  ...mail.data.headers,
  'X-App': 'MyApp',
}; // add headers
mail.data.attachments = [
  ...(mail.data.attachments || []),
  { filename: 'file.txt', content: 'Hello' },
]; // add Attachment

// This is the compiled MIME message object

// ⚠️ Only available in "stream" phase (mostly)

// Methods:
mail.message.createReadStream();
// Example:
const stream = mail.message.createReadStream();

// mail.resolveContent() (VERY IMPORTANT)

// Used to resolve dynamic content (buffers, streams, etc.)

// Syntax:
mail.resolveContent(obj, key, callback);
// Example:
mail.resolveContent(mail.data, 'html', (err, value) => {
  console.log(value);
});

// mail.normalize() (Internal)

// Used internally to normalize fields.

// 👉 Rarely used manually.

// mail.getHeader() / setHeader()
// Get Header
mail.getHeader('subject');
// Set Header
mail.setHeader('X-Custom', 'value');

// mail.messageId()
const id = mail.messageId();

// mail.envelope

// SMTP-level envelope (different from headers)

mail.data.envelope = {
  from: 'bounce@example.com',
  to: ['user@example.com'],
};

// transporter.use(step, handle)
//  step:- compile
transporter.use('compile', (mail, callback) => {
  console.log('📦 COMPILE PHASE');

  // 👉 Access original email data
  console.log('Before:', mail.data);

  // ✅ Modify subject
  mail.data.subject = `[MyApp] ${mail.data.subject}`;

  // ✅ Add footer to HTML
  if (mail.data.html) {
    mail.data.html += `
      <hr/>
      <p style="font-size:12px;color:gray">
        This email was sent from MyApp 🚀
      </p>
    `;
  }

  // ✅ Add default text if missing
  if (!mail.data.text) {
    mail.data.text = 'Fallback text version';
  }

  callback(); // must call
});

// step:- stream
transporter.use('stream', (mail, callback) => {
  console.log('📡 STREAM PHASE');

  // 👉 mail.message = raw MIME stream
  const originalCreateReadStream = mail.message.createReadStream;

  mail.message.createReadStream = function () {
    const stream = originalCreateReadStream.call(this);

    stream.on('data', (chunk) => {
      console.log('📨 Sending chunk:', chunk.length);
    });

    stream.on('end', () => {
      console.log('✅ Email stream finished');
    });

    return stream;
  };

  callback();
});
```

## 📤 5. Send Email

```js
const info = await transporter.sendMail({
    // address filds
    from: '"tony stark" <tony7085@gmail.com>',
    to: "user1@gmail.com, user2@gmail.com",
    cc: "cc@gmail.com",
    bcc: "bcc@gmail.com",
    replyTo: "support@gmail.com",
    // content fields
    subject: "heelo",
    text: "plain text",
    html: "<b>Hello</b>",
    // advanced content
    alternatives: [
        {
            // plain/text
            contentType: "text/plain",
            content: "Hello world"
        },
        {
            //  html
            contentType: "text/html",
            content: "<h1>Hello</h1>"
        },
        {
            // mardown
            contentType: "text/x-web-markdown",
            content: "**Hello** _world_"
        },
        {
            // AMP Email (Interactive Gmail Emails)
            contentType: "text/x-amp-html",
            content: `
                 <!doctype html>
                    <html amp4email>
                        <body>
                            <h1>Hello AMP</h1>
                        </body>
                    </html>
            `
        },
        {
            // Calendar Event
            contentType: "text/calendar",
            content: "BEGIN:VCALENDAR..."
        },
        {
            //  JSON/ Custom data
            contentType: "application/json",
            content: SON.stringify({ msg: "Hello" })
        },
        {
            //  xml
            contentType: "pplication/xml",
            content: "<note>MyApp</note>"
        },
        {
            // Rich Text (RTF)
            contentType: "application/rtf",
            content: "{\\rtf1\\ansi Hello}"
        }
    ],
    attachments: [
        {
            filename: "file.txt",
            content: "Hello",
            path: "./file.txt",
            href: "https:user/file",
            contentType: "text/plain",
            contentDisposition: "attachment",
            cid: "imge@cid",
            encoding: "base64"
        },
        {
            filename: "file.pdf",
            path: "./file.pdf",
            contentType: "application/pdf"
        },
        {
            filename: "logo.png",
            path: "./logo.png",
            cid: "logo@nodemailer"
        }
    ],
    headers: {
        "List-Unsubscribe": "<mailto:unsubscribe@example.com>",
        "List-Unsubscribe": "<https://yourapp.com/unsubscribe>",
        "List-Unsubscribe": "<mailto:unsubscribe@example.com>, <https://yourapp.com/unsubscribe>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "x-custom-header": "value",
        "X-Mailer": "MyApp",
        "X-Mailer": "Nodemailer",
        "X-Mailer": "My SaaS Platform v1.2",
        "Precedence": "bulk",
        "X-Priority": "1",
        "X-Tracking-ID": "user123"

    },
    // Envelope (SMTP Level)
    envelope: {
        from: "bounce@example.com",
        to: ["user@example.com"]
    },
    // Other Important Fields
    priority: "high",       // high | normal | low
    encoding: "utf-8",
    date: new Date(),
    messageId: "<custom@id>",
    // Calendar Events (ICAL)
    icalEvent: {
        method: "REQUEST",
        content: "BEGIN:VCALENDAR..."
    }
})

// example
const info_ex = await nodemailer.sendMail({
    from: "'Tony stark' <tony7085@gmail.com>",
    to: "user@gmail.com",
    cc: "cc@gmail.com",
    bcc: "bcc@gmail.com",
    subject: "Full Email",
    text: "Plain version",
    html: `<h1>Hello world</h1> <img src='cid:logo@nodemailer'/>`,
    attachments: [
        {
            filename: "logo.png",
            path: "./file.png",
            cid: "logo@nodemailer"
        },
        {
            filename: "file.pdf",
            path: "buffer.pdf"
        }
    ],
    headers: {
        "X-app": "myapp"
    },
    replyTo: "support@gmail.com",
    priority: "high",
    alternatives: [
        {
            // mardown
            contentType: "text/x-web-markdown",
            content: "**Hello** _world_"
        }
    ],
    amp: "<!doctype html><html amp4email>...</html>",
    watchHtml: "<b> Watch version</b>",
    icalEvent: {
        method: "REQUEST",
        content: "BEGIN:VCALENDAR..."
    }

})

// output
{
    accepted: ['user@test.com'],
    rejected: [],
    envelopeTime: 123,
    messageTime: 456,
    messageSize: 789,
    response: '250 OK',
    envelope: {},
    messageId: '<abc123@ethereal.email>'
}
```

#### 📎 6. sendEmail ouput

```js
{
    accepted: ['user@test.com'],
    rejected: [],
    envelopeTime: 123,
    messageTime: 456,
    messageSize: 789,
    response: '250 OK',
    envelope: {},
    messageId: '<abc123@ethereal.email>'
}
```

```js
const getTestMessageUrl_v = nodemailer.getTestMessageUrl(info);
console.log(getTestMessageUrl_v);
// return value
const result = {
  accepted: ['user@test.com'],
  rejected: [],
  envelopeTime: 123,
  messageTime: 456,
  messageSize: 789,
  response: '250 OK',
  envelope: {},
  messageId: '<abc123@ethereal.email>',
};
```

## 📊 7. Verify SMTP

```js
await transporter.verify();

// example
async function checkSMTP() {
  try {
    await transporter.verify();
    Console.log('SMTP server is ready');
  } catch (error) {
    console.log('SMTP error:', error);
  }
}
```

## 🔚 8. Close Connection

```js
await transporter.close();

async function shutdown() {
  console.log('Closing mail connections...');
  await transporter.close();
}
```
