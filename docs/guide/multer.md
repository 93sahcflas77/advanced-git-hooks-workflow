# 📁 Multer File Upload - Complete Guide

## 🧠 Storage Options

### 1. Memory Storage

```js
storage: multer.memoryStorage();
```

- Stores files in **RAM (Buffer)**
- Useful for:
  - Image processing
  - Sending files to cloud (S3, Cloudinary)

---

### 2. Disk Storage

```js
storage: multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = 'uploads';
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    const imagesDir = 'uploads/images';
    if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir);

    const documentsDir = 'uploads/documents';
    if (!fs.existsSync(documentsDir)) fs.mkdirSync(documentsDir);

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, 'uploads/images');
    } else if (file.mimetype === 'application/pdf') {
      cb(null, 'uploads/documents');
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.originalname + '-' + Date.now() + ext);
  },
});
```

---

## 📦 File Object Example

```js
req.file = {
  destination: 'uploads/images',
  filename: 'example.jpg-1623456789012.jpg',
  path: 'uploads/images/example.jpg-1623456789012.jpg',
  size: 123456,
  mimetype: 'image/jpeg',
};
```

---

## ⚙️ Limits Configuration

```js
limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
    files: 5,
    fields: 10,
    parts: 15,
    headerPairs: 20,
    fieldnameSize: 100,
    fieldSize: 1024 * 1024 // 1MB
}
```

---

## 🚫 File Filter

```js
fileFilter: (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};
```

---

## 🧩 Multer Middleware Types

### 1. Single File Upload

```js
upload.single('file');
```

**Frontend:**

```html
<input type="file" name="file" />
```

```
req.file = {
    destination: 'uploads/images',
    filename: 'example.jpg-1623456789012.jpg',
    path: 'uploads/images/example.jpg-1623456789012.jpg',
    size: 123456,
    mimetype: 'image/jpeg'
}
```

---

### 2. Multiple Files (Array)

```js
upload.array('files', 5);
```

**Frontend:**

```html
<input type="file" name="files" multiple />
```

```
req.files = [
    {
        destination: 'uploads/images',
        filename: 'example1.jpg-1623456789012.jpg',
        path: 'uploads/images/example1.jpg-1623456789012.jpg',
        size: 123456,
        mimetype: 'image/jpeg'
    },
    {
        destination: 'uploads/images',
        filename: 'example2.jpg-1623456789012.jpg',
        path: 'uploads/images/example2.jpg-1623456789012.jpg',
        size: 123456,
        mimetype: 'image/jpeg'
    }
];
```

---

### 3. Multiple Fields

```js
upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'documents', maxCount: 5 },
]);
```

**Frontend:**

```html
<input type="file" name="images" multiple /> <input type="file" name="documents" multiple />
```

```
req.files = {
    images: [
        {
            destination: 'uploads/images',
            filename: 'example1.jpg-1623456789012.jpg',
            path: 'uploads/images/example1.jpg-1623456789012.jpg',
            size: 123456,
            mimetype: 'image/jpeg'
        }
    ],
    documents: [
        {
            destination: 'uploads/documents',
            filename: 'example.pdf-1623456789012.pdf',
            path: 'uploads/documents/example.pdf-1623456789012.pdf',
            size: 123456,
            mimetype: 'application/pdf'
        }
    ]
};
```

---

### 4. Any Files

```js
upload.any();
```

**Frontend:**

```html
<input type="file" name="file1" /> <input type="file" name="file2" />
```

```
req.files = [
    {
        fieldname: 'file1',
        destination: 'uploads/images',
        filename: 'example1.jpg-1623456789012.jpg',
        size: 123456,
        mimetype: 'image/jpeg'
    },
    {
        fieldname: 'file2',
        destination: 'uploads/documents',
        filename: 'example.pdf-1623456789012.pdf',
        size: 123456,
        mimetype: 'application/pdf'
    }
];
```

---

### 5. No Files (Only Text)

```js
upload.none();
```

**Frontend:**

```html
<input type="text" name="username" /> <input type="text" name="email" />
```

```
req.body = {
    username: 'john_doe',
    email: 'chandan7073251686@gmail.com"
};
```

---

## 🧾 Request Body Example

```js
req.body = {
  username: 'john_doe',
  email: 'example@gmail.com',
};
```

---

## 🚀 Summary

| Feature       | Description                       |
| ------------- | --------------------------------- |
| memoryStorage | Store in RAM                      |
| diskStorage   | Store in local disk               |
| fileFilter    | Validate file types               |
| limits        | Control upload size               |
| middleware    | Handle different upload scenarios |

---

💡 Tip: Use memoryStorage for cloud uploads and diskStorage for local file systems.
