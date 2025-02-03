// const zodiacCompatibility = {
//     Aries: ["Géminis", "Leo", "Sagitario"],
//     Tauro: ["Cáncer", "Virgo", "Capricornio"],
//     Géminis: ["Aries", "Leo", "Libra"],
//     Cáncer: ["Tauro", "Virgo", "Escorpio"],
//     Leo: ["Aries", "Géminis", "Sagitario"],
//     Virgo: ["Tauro", "Cáncer", "Capricornio"],
//     Libra: ["Géminis", "Leo", "Sagitario"],
//     Escorpio: ["Cáncer", "Virgo", "Capricornio"],
//     Sagitario: ["Aries", "Leo", "Libra"],
//     Capricornio: ["Tauro", "Virgo", "Escorpio"],
//     Acuario: ["Géminis", "Libra", "Sagitario"],
//     Piscis: ["Cáncer", "Escorpio"]
//   };
  

// // Función para comprobar la compatibilidad entre dos personas
// function checkCompatibility(person1, person2) {
//     const sign1 = person1.sign;
//     const sign2 = person2.sign;
  
//     // Verificar si el primer signo existe en el objeto de compatibilidad
//     if (!zodiacCompatibility[sign1]) {
//       return `${sign1} no es un signo válido.`;
//     }
  
//     // Verificar la compatibilidad
//     const isCompatible = zodiacCompatibility[sign1].includes(sign2);
    
//     if (isCompatible) {
//       return `${person1.name} (${sign1}) y ${person2.name} (${sign2}) son compatibles.`;
//     } else {
//       return `${person1.name} (${sign1}) y ${person2.name} (${sign2}) no son compatibles.`;
//     }
//   }
  
//   // Ejemplo de uso
//   const person1 = { name: 'Alice', sign: 'Aries' };
//   const person2 = { name: 'Bob', sign: 'Leo' };
  
//   console.log(checkCompatibility(person1, person2)); // Alice (Aries) y Bob (Leo) son compatibles.
  