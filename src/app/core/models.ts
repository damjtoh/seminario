export interface User {
  nombre: string,
  apellido: string,
  email: string,
  dni: string,
  id: string,
  rol: 'farmaceutico' | 'medico' | 'enfermero'
}

export class FarmaceuticoRole {
  id: string = 'farmaceutico';
  description: string = 'Farmaceutico'
}
export class MedicoRole {
  id: string = 'medico';
  description: string = 'Médico'
}
