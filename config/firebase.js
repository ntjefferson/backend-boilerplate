const admin = require('firebase-admin');

const firebaseConfig = {
  development: {
    type: process.env.DEV_FB_TYPE,
    project_id: process.env.DEV_FB_PROJECT_ID,
    private_key_id: process.env.DEV_FB_PRIVATE_KEY_ID,
    private_key: process.env.DEV_FB_PRIVATE_KEY,
    client_email: process.env.DEV_FB_CLIENT_EMAIL,
    client_id: process.env.DEV_FB_CLIENT_ID,
    auth_uri: process.env.DEV_FB_AUTH_URI,
    token_uri: process.env.DEV_FB_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.DEV_FB_AUTH_PROV,
    client_x509_cert_url: process.env.DEV_FB_CLIENT_CERT,
    database_url: process.env.DEV_FB_DB_URL,
  },
  production: {
    type: process.env.FB_TYPE,
    project_id: process.env.FB_PROJECT_ID,
    private_key_id: process.env.FB_PRIVATE_KEY_ID,
    private_key: process.env.FB_PRIVATE_KEY,
    client_email: process.env.FB_CLIENT_EMAIL,
    client_id: process.env.FB_CLIENT_ID,
    auth_uri: process.env.FB_AUTH_URI,
    token_uri: process.env.FB_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FB_AUTH_PROV,
    client_x509_cert_url: process.env.FB_CLIENT_CERT,
  },
};

const environment = process.env.NODE_ENV || 'development';

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig[environment]),
  databaseURL: firebaseConfig[environment].database_url,
});

module.exports = firebaseAdmin;
