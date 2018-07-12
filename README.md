# Seminario

## Instalación
1. Clonar repositorio: ```git clone https://github.com/damjtoh/seminario.git```
2. Instalar [NodeJS](https://nodejs.org/en/) versión superior a 8.
3. ```cd seminario```
4. ```npm install```
5. ```ng serve```
6. Ingresar a ```http://localhost:4200```

-------

## API

### Indicaciones

#### Login

**URL**: ```/api/login```

**METHOD**: ```POST```

**BODY**: 
```json
{
  "user": "myUser",
  "password": "myPassword"
}
```

**RESPONSE**: 
```json
{
  "token": "abee818d-9fa9-4a58-826a-1daa15f94863",
  "user": {
    "id": "abee818d-9fa9-4a58-826a-1daa15f94863",
    "dni": "37356501",
    "name": "Pepe itaka",
    "username": "user",
    "role": { "id": "enfermero", "description": "Enfermero" }
}
```

#### Obtener indicaciones

**URL**: ```/api/indicaciones/?estado=```

**METHOD**: ```GET```

**PARAMS**: ```estado: VALIDADA | PENDIENTE | RECHAZADA```

**Ejemplo**: ```/api/indicaciones/?estado=VALIDADA```

----

#### Guardar indicaciones
**URL**: ```/api/indicaciones/?estado=```

**METHOD**: ```POST```

**BODY**: 
```json
{
  "paciente": "37356501",
  "diagnostico": "ewrewrewrwe",
  "medicamentos": [
    {
      "cantidad": 23,
      "frecuencia": 23,
      "medicamento": "Ibuprofeno 800",
      "unidad": "hora"
    }
  ]
}
```


**Ejemplo**: ```/api/indicaciones/?estado=VALIDADA```

