export interface DentistItem {
    _id: string,
    name: string,
    years_of_experience: number,
    area_of_expertise: string,
    picture: string,
    appointments: Appointment[],
    id: string
  }
  
export interface DentistJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: DentistItem[]
}

export interface Appointment {
  _id: string;
  apptDate: Date;
  user: User; // เป็น ObjectID ของผู้ใช้
  dentist: DentistItem; // เป็น ObjectID ของหมอฟัน
  createdAt: Date;
  __v: number;
}

export interface User {
  _id:string,
  name:string
}



export interface Appointments {
  success: boolean,
  count: number,
  data: Appointment[]
}

export interface Credentials {
    email: string;
    password: string;
  }