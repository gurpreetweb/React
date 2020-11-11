export function getUserObj() {
  try {
  
      const Object = JSON.parse(localStorage.getItem('userData'));
      return Object;
    
  } catch (ex) {
    return null;
  }
}