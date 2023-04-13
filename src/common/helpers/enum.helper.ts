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

export enum EnumQuarterPlanningStatus {
  IN_PROGRESS = 'En cours',
  PENDING = 'En standby',
  DONE = 'Cloturer',
}

export enum EnumBreakdownStatus {
  DECLARED = 'Declaré',
  IN_PROGRESS = 'En cours',
  FIXED = 'Reparé',
}

export enum EnumBreakdownPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum EnumQuarterTimeStatus {
  IN_PROGRESS = 'En cours',
  PENDING = 'En standby',
  FREE = 'Libre',
}

export enum EnumTaskStatus {
  IN_PROGRESS = 'En cours',
  TO_DO = 'A faire',
  DONE = 'Terminer',
}

export enum EnumCarboyType {
  'ENTER' = 'Entrée',
  'EXIT' = 'Sortie'
}

export enum EnumEmployeeType {
  OFFICE = 'Bureau',
  MAINTENANCE = 'Maintenancier',
  PRODUCTION = 'Production',
  DELIVERY = 'Livreur/Chauffeur',
}

export enum EnumPayslipStatus {
  PAID = 'payé',
  UNPAID = 'non payé',
}

export enum EnumMaterialType {
  PLANT = 'Usine',
  CAP = 'Capuchon',
  PREFORM = 'Préforme',
  BOTTLE = 'Bonbonne',
}
