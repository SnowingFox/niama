/*import { $apiQuery } from '../api/u.api.service';
import { $upperCase, $upperFirst } from '../core/u.core.service.lodash';
import { $ormBrF, $ormConstants, $ormOperations } from '../orm/u.orm.service';
import familyStatuses from './content/f.user-profile.family-statuses.content.json';
import genders from './content/f.user-profile.genders.content.json';
import origins from './content/f.user-profile.origins.content.json';
import professionCategories from './content/f.user-profile.profession-categories.content.json';
import professionFractions from './content/f.user-profile.profession-fractions.content.json';
import professionHours from './content/f.user-profile.profession-hours.content.json';
import professionLegalStatuses from './content/f.user-profile.profession-legal-statuses.content.json';
import professionMissionaries from './content/f.user-profile.profession-missionaries.content.json';
import professionStatuses from './content/f.user-profile.profession-statuses.content.json';
import roles from './content/f.user.roles.content.json';
import subjects from './content/f.user.subjects.content.json';
import types from './content/f.user.types.content.json';

// MAIN: USER PROFILE ======================================================================================================================

export const $userProfileId = 'userProfile';

export const $userProfileF: N.UserProfileF = [
  'birthCity',
  'birthCountry',
  'birthDepartment',
  'birthZipcode',
  'birthdate',
  'city',
  'country',
  'department',
  'email',
  'familyName',
  'familyStatus',
  'forenames',
  'gender',
  'id',
  'nationality',
  'origin',
  'phone',
  'phoneAlt',
  'professionAptDate',
  'professionAptFrom',
  'professionAptHours',
  'professionAptTo',
  'professionCategory',
  'professionCivilEquivalent',
  'professionEmployerApeCode',
  'professionEmployerCity',
  'professionEmployerCountry',
  'professionEmployerForename',
  'professionEmployerSiret',
  'professionEmployerStreet',
  'professionEmployerSurname',
  'professionEmployerZipcode',
  'professionFraction',
  'professionHours',
  'professionLabel',
  'professionLegalStatus',
  'professionMissionary',
  'professionOther',
  'professionStatus',
  'ssn',
  'street',
  'streetExtra',
  'surname',
  'zipcode',
];

// MAIN: USER  =============================================================================================================================

export const $userId = 'user';
export const $userLabel = 'Utilisateur';
export const $userOrderBy = 'surname';
export const $userRemote = true;

export const $userF: N.UserF = {
  _: [...$ormBrF, 'codeHARPEGE', 'codeUR', 'roles', 'subjects', 'types', 'username'],
  profile: $userProfileF,
};

export const $userConstants: N.UserConstants = $ormConstants($userId, $userLabel, {
  fields: $userF,
  other: { READ_ME: 'me' },
});

export const $userOperations: N.UserOperations = $ormOperations($userConstants, $userRemote, {
  readMe: (fields?: N.UserF) => $apiQuery([{ fields: fields || $userF, remote: $userRemote, selector: $userConstants.READ_ME }]),
});

// ENUMS ===================================================================================================================================

export const $userProfileFamilyStatuses: N.UserProfileFamilyStatus[] = Object.keys(familyStatuses) as N.UserProfileFamilyStatus[];
export const $userProfileGenders: N.UserProfileGender[] = Object.keys(genders) as N.UserProfileGender[];
export const $userProfileOrigins: N.UserProfileOrigin[] = Object.keys(origins) as N.UserProfileOrigin[];

export const $userProfileProfessionCategories: N.UserProfileProfessionCategory[] = Object.keys(
  professionCategories
) as N.UserProfileProfessionCategory[];

export const $userProfileProfessionFractions: N.UserProfileProfessionFraction[] = Object.keys(
  professionFractions
) as N.UserProfileProfessionFraction[];

export const $userProfileProfessionHours: N.UserProfileProfessionHours[] = Object.keys(professionHours) as N.UserProfileProfessionHours[];

export const $userProfileProfessionLegalStatuses: N.UserProfileProfessionLegalStatus[] = Object.keys(
  professionLegalStatuses
) as N.UserProfileProfessionLegalStatus[];

export const $userProfileProfessionMissionaries: N.UserProfileProfessionMissionary[] = Object.keys(
  professionMissionaries
) as N.UserProfileProfessionMissionary[];

export const $userProfileProfessionStatuses: N.UserProfileProfessionStatus[] = Object.keys(
  professionStatuses
) as N.UserProfileProfessionStatus[];

export const $userRoles: N.UserRole[] = Object.keys(roles) as N.UserRole[];
export const $userSubjects: N.UserSubject[] = Object.keys(subjects) as N.UserSubject[];
export const $userTypes: N.UserType[] = Object.keys(types) as N.UserType[];

// I18N ====================================================================================================================================

export const $userProfileFamilyStatusesI18n: N.I18n<N.UserProfileFamilyStatus> = familyStatuses;
export const $userProfileGendersI18n: N.I18n<N.UserProfileGender> = genders;
export const $userProfileOriginsI18n: N.I18n<N.UserProfileOrigin> = origins;
export const $userProfileProfessionCategoriesI18n: N.I18n<N.UserProfileProfessionCategory> = professionCategories;
export const $userProfileProfessionFractionsI18n: N.I18n<N.UserProfileProfessionFraction> = professionFractions;
export const $userProfileProfessionHoursI18n: N.I18n<N.UserProfileProfessionHours> = professionHours;
export const $userProfileProfessionLegalStatusesI18n: N.I18n<N.UserProfileProfessionLegalStatus> = professionLegalStatuses;
export const $userProfileProfessionMissionariesI18n: N.I18n<N.UserProfileProfessionMissionary> = professionMissionaries;
export const $userProfileProfessionStatusesI18n: N.I18n<N.UserProfileProfessionStatus> = professionStatuses;
export const $userRolesI18n: N.I18n<N.UserRole> = roles;
export const $userSubjectsI18n: N.I18n<N.UserSubject> = subjects;
export const $userTypesI18n: N.I18n<N.UserType> = types;


// USER PROFILE ============================================================================================================================

export const $userProfileForenames = (value: string, separator = ','): string[] =>
  value ? value.split(separator).map((forename) => $upperFirst(forename.trim())) : [];

export const $userProfileForename = (value: string, separator = ','): string | null => {
  const forenames: string[] = $userProfileForenames(value, separator);
  return forenames.length > 0 ? forenames[0] : null;
};

export const $userProfileFullName = (surname: string, forenames: string): string | null =>
  surname && forenames ? `${$upperCase(surname)} ${$userProfileForename(forenames)}` : null;

export const $userProfileForenamesI18n = (value: string[], otherwise = null): string | null =>
  value ? value.map($upperFirst).join(', ') : otherwise;

// USER ====================================================================================================================================

export const $userIamAdmin = (role: N.UserRole) => role === 'ADMIN';
export const $userIamManager = (role: N.UserRole) => role === 'MANAGER';
export const $userIamSuperAdmin = (role: N.UserRole) => role === 'SUPER_ADMIN';
export const $userIamAtLeastManager = (role: N.UserRole) => $userIamSuperAdmin(role) || $userIamAdmin(role) || $userIamManager(role);*/
