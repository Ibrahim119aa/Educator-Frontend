export interface TeachingLocation {
  teaching_location_id: number;
  location_name: string;
}
export interface Teacher
{
  teacher_id:string | "",
  first_name:string | "",
  middle_name:string | "",
  last_name:string | "",
  email:string | "",
  gender:string | "",
  photo:string | "",
  phone:string | "",
  education_qualification:string | ""



}
export interface ResidentialAddress {
  address_id?: number;
  ward_no_panchayat: string;
  colony_village: string;
  landmark: string;
  city: string;
  pin_code: string;
  state: string;
}

export interface ResidentialAddressFormProps {
  teacherData: { residential_address?: ResidentialAddress };
  canUpdate?: boolean;
}

export interface Ward {
  teaching_ward_id: string;
  ward_no_panchayat: string;
}

export interface TeachingLocationEntry {
  teaching_location_id: number;
  ward_no_panchayat: string;
  location_name: string;
}

export interface TeacherData {
  teaching_locations: TeachingLocationEntry[];
}