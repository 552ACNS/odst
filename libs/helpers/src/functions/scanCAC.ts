//returns the first character of the input string to allow the export method to run the correct export code
function getCACType(rawScan) {
  return rawScan.substring(0, 1);
}

export function getFirstName(scanData) {
  // Depending on the CAC type, get the first name
  const cacType = getCACType(scanData);
  let firstName = '';
  switch (cacType) {
    case 'M':
      firstName = scanData.substring(16, 36).trim();

      break;
    case 'N':
      firstName = scanData.substring(15, 35).trim();
      break;
    default:
  }
  return firstName;
}
export function getMiddleInitial(scanData) {
  // Depending on the CAC type, get the middle initial
  const cacType = getCACType(scanData);

  let middleInitial = '';

  switch (cacType) {
    case 'M':
      middleInitial = scanData.substring(36, 37);
      break;
    case 'N':
      middleInitial = scanData.substring(88, 89);
      break;
    default:
  }
  return middleInitial;
}
export function getLastName(scanData) {
  // Depending on the CAC type, get the last name
  const cacType = getCACType(scanData);

  let lastName = '';
  switch (cacType) {
    case 'M':
      lastName = scanData.substring(37, 52).trim();

      break;
    case 'N':
      lastName = scanData.substring(35, 50).trim();
      break;
    default:
  }
  return lastName;
}
export function getDoDID(scanData) {
  // Depending on the CAC type, get the DoD ID
  const cacType = getCACType(scanData);

  let dodID = '';
  let parsedDoDID = '';
  switch (cacType) {
    case 'M':
      dodID = scanData.substring(1, 8);
      parsedDoDID = parseInt(dodID, 32).toString(10);
      break;
    case 'N':
      dodID = scanData.substring(8, 15);
      parsedDoDID = parseInt(dodID, 32).toString(10);
      break;
    default:
  }
  return parsedDoDID;
}
export function getDoB(scanData) {
  // Depending on the CAC type, get the date of birth
  const cacType = getCACType(scanData);

  let str = '';
  // eslint-disable-next-line prefer-const
  let dateOfBirth = new Date(1000, 0, 1);
  switch (cacType) {
    case 'M':
      str = parseInt(scanData.substring(63, 67), 32).toString(10);
      dateOfBirth.setDate(dateOfBirth.getDate() + +str);
      break;
    case 'N':
      str = parseInt(scanData.substring(61, 65), 32).toString(10);
      dateOfBirth.setDate(dateOfBirth.getDate() + +str);
      break;
    default:
  }
  return dateOfBirth;
}
export function getSSN(scanData) {
  // Depending on the CAC type, get the social security number
  const cacType = getCACType(scanData);
  let socialSecurityNumber;
  switch (cacType) {
    case 'M':
      socialSecurityNumber = '';
      break;
    case 'N':
      socialSecurityNumber = parseInt(scanData.substring(1, 7), 32).toString(
        10
      );
      break;
    default:
  }
  return socialSecurityNumber;
}
