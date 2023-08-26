export default function envConfig() {
  return {
    GoogleClientId: process.env.GOOGLE_CLIENT_ID || "",
    GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    GoogleRegisterCallbackURL: process.env.GOOGLE_REGISTER_CALLBACK_URL || "",
    FacebookCallBackURL: process.env.FACEBOOK_CALLBACK_URL || "",
    FacebookAPPID: process.env.FACEBOOK_APP_ID || "",
    FacebookAPPSecret: process.env.FACEBOOK_APP_SECRET || "",
    LoginSuccessCallbackURL: process.env.LOGIN_SUCCESS_CALLBACK_URL || "",
    LoginFailedCallbackURL: process.env.LOGIN_FAIL_CALLBACK_URL || "",
    APP_PORT: process.env.PORT || "",
    MongoConnectionURI: process.env.MONGODB_URI || "",
    APP_JWT_SECRET: process.env.JWT_SECRET || "",
    PassportSessionSecret: process.env.PASSPORT_SESSION_SECRET || "",
    AppServiceEmail: process.env.SERVICE_EMAIL || "",
    AppServiceEmailPassword: process.env.EMAIL_SERVICE_PASSWORD || "",

    //github o auth
    GithubOAuthClientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET || "",
    GithubOAuthClientId: process.env.GITHUB_OAUTH_CLIENT_ID || "",
    GithubRegisterCallbackURL: process.env.GITHUB_REGISTER_CALLBACK_URL || "",

    //github app
    GithubAppId: process.env.GITHUB_APP_ID || "",
    GithubAppSecret: process.env.GITHUB_APP_SECRET || "",
    GithubAppClientId: process.env.GITHUB_CLIENT_ID || "",
    GithubInstallationRedirectUrl:
      process.env.GITHUB_APP_INSTALL_REDIRECT_URL || "",

    //APP DETAILS

    APP_NAME: process.env.APP_NAME || "",
    APP_LOGO: process.env.WHITE_LOGO_URL || "",
    APP_WEBSITE_ENDPOINT: process.env.WEBSITE_END_POINT || "",
    APP_TWITTER_URL: process.env.TWITTER_LINK || "",
    APP_LINKEDIN_URL: process.env.LINKED_IN || "",
    APP_FACEBOOK_URL: process.env.FACEBOOK || "",
    APP_INSTAGRAM_URL: process.env.INSTAGRAM || "",
    APP_PHONE_NUMBER: process.env.PHONE_NUMBER || "",
    APP_ADDRESS: process.env.ADDRESS || "",
    APP_EMAIL: process.env.EMAIL || "",
  };
}
