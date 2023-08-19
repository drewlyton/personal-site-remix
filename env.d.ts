declare namespace NodeJS {
  export interface ProcessEnv {
    PREVIEW: string;
    CONVERTKIT_API_KEY: string;
    SENDGRID_API_KEY: string;
    SENDGRID_CONFIRMED_SEGMENT: string;
    SENDGRID_TEST_LIST: string;
    CONVERTKIT_API_SECRET: string;
    CONVERTKIT_STORY_FORM_ID: string;
  }
}
