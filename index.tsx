import { Doctor, ScheduleSlot } from './types';

// Motor de datos masivos para RC MediCall - Carga Automática
const RAW_DATA = `EJECUTIVO,NOMBRE,ESPECIALIDAD,SUB ESPECIALIDAD,DIRECCION,HOSPITAL,CONSULTORIO,PISO,TELEFONO,CORREO ELECTRONICO,CEDULA PROFESIONAL,FECHA DE NACIMIENTO,ASEGURADORA,CATEGORIA,ESTILO SOCIAL,SEGMENTO ACTITUDINAL,HORA DE ATENCIÓN,OBSERVACIONES`;

export const parseDataString = (data: string): Doctor[] => {
  const lines = data.trim().split('\n');
  const doctors: Doctor[] = [];

  lines.forEach((line, index) => {
    // Salta la cabecera
    if (index === 0 && line.toUpperCase().includes('EJECUTIVO')) return;
    
    // Parser robusto para CSV con comas dentro de comillas
    const parts: string[] = [];
    let currentPart = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
            parts.push(currentPart.trim());
            currentPart = '';
        } else {
            currentPart += char;
        }
    }
    parts.push(currentPart.trim());

    if (parts.length >= 2) {
      const executive = (parts[0] || 'SIN ASIGNAR').toUpperCase();
      const name = (parts[1] || 'DESCONOCIDO').toUpperCase();
      
      if (name && name !== "NOMBRE" && name !== "") {
        const initialSchedule: ScheduleSlot[] = [
            { day: 'LUNES', time: '', active: false },
            { day: 'MARTES', time: '', active: false },
            { day: 'MIÉRCOLES', time: '', active: false },
            { day: 'JUEVES', time: '', active: false },
            { day: 'VIERNES', time: '', active: false },
            { day: 'SÁBADO', time: '', active: false },
            { day: 'DOMINGO', time: '', active: false }
        ];

        doctors.push({
          id: `doc-${index}-${name.replace(/\s+/g, '')}`,
          category: (parts[13] || 'MEDICO').toUpperCase() as any,
          executive,
          name,
          specialty: (parts[2] || 'GENERAL').toUpperCase(),
          subSpecialty: (parts[3] || '').toUpperCase(),
          address: (parts[4] || '').toUpperCase(),
          hospital: (parts[5] || '').toUpperCase(),
          officeNumber: parts[6] || '',
          floor: parts[7] || '',
          phone: parts[8] || '',
          email: parts[9] || '',
          cedula: parts[10] || '',
          birthDate: parts[11] || '',
          isInsuranceDoctor: !!parts[12], 
          classification: (parts[13]?.toUpperCase().includes('VIP') ? 'A' : 'C'),
          socialStyle: (parts[14] || '') as any,
          attitudinalSegment: (parts[15] || '') as any,
          importantNotes: parts[17] || '',
          visits: [],
          schedule: initialSchedule
        });
      }
    }
  });

  return doctors;
};

export const parseData = (): Doctor[] => {
  return parseDataString(RAW_DATA);
};