export interface ContactApiResponse {
  count: number;
  entries: Contact[];    
}
export interface Contact {
  id: number;        
  nombre: string;    
  calle: string;     
  numero: string;    
  colonia: string;   
  ciudad: string;    
}
  