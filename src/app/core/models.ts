export interface User {
  name: string,
  username: string,
  dni: string,
  id: string,
  role: FarmaceuticoRole | MedicoRole
}

export class FarmaceuticoRole {
  id: string = 'farmaceutico';
  description: string = 'Farmaceutico'
}
export class MedicoRole {
  id: string = 'medico';
  description: string = 'Médico'
}
