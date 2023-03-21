export enum EnumGender {
  MALE = 'Male',
  FEMALE = 'Female',
  UNSPECIFIED = 'Unspecified',
}

export enum EnumEnv {
  DEV = 'dev',
  STG = 'stg',
  PRD = 'prd',
}

export enum EnumStatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

export enum EnumOtpRaison {
  VERIFY_EMAIL = 'Verify Email',
  RESET_PASSWORD = 'Reset Password',
}

export enum EnumQuarterTimeStatus {
  IN_PROGRESS = 'In Progress',
  PENDING = 'Pending',
}

export enum EnumTaskStatus {
  IN_PROGRESS = 'In Progress',
  TO_DO = 'To Do',
  DONE = 'Done',
}
