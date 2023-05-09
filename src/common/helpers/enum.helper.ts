export enum EnumGender {
  MALE = 'Male',
  FEMALE = 'Female',
  UNSPECIFIED = 'Unspecified',
}

export enum EnumEnv {
  DEV = 'development',
  STG = 'staging',
  PRD = 'production',
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
  'EXIT' = 'Sortie',
}

export enum EnumPresenceStatus {
  ABSENT = 'Absent',
  PRESENT = 'Présent',
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

export enum EnumDeliverySlipStatus {
  PENDING = 'En attente',
  IN_PROGRESS = 'En cours',
  DONE = 'Terminé',
}

export enum EnumMaterialType {
  PLANT = 'Usine',
  CAP = 'Capuchon',
  PREFORM = 'Préforme',
  BOTTLE = 'Bonbonne',
}

export enum EnumCustomerType {
  CONSUMPTION = 'Consommation',
  CONTRACT = 'Contrat',
}

export enum EnumUpkeepType {
  FOUNTAIN = 'Fontaine',
  AIR_CONDITIONER = 'Climatiseur',
  FREEZER = 'Congélateur',
  POULTRY = 'Pondeuse',
}

export enum EnumUpkeepStatus {
  OK = 'OK',
  NOT_OK = 'Not OK',
  NOT_YET = 'Not yet',
}

