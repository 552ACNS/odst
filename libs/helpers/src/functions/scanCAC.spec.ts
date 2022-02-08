import { getDoB, getDoDID, getFirstName, getLastName, getMiddleInitial, getSSN } from './scanCAC'

describe('the CAC scans', () => {
    const cacM = "M1F4N00O01IIDECSBrandon             DDerullo                   B464US AF00AMN   ME47BCHLBDJJTOTQNU"
    const cacN = "N03R6HLS1F4N00OBrandon             Derullo                   B464AF00AMN   ME02BBFEBCHL6D"
  
    it('should get the first name', () => {
    const result = "Brandon"
    expect(getFirstName(cacM)).toBe(result)
    expect(getFirstName(cacN)).toBe(result)
  });
  it('should get the middle initial ', () => {
    const result = "D"
    expect(getMiddleInitial(cacM)).toBe(result)
    expect(getMiddleInitial(cacN)).toBe(result)
  });
  it('should get the last name', () => {
    const result = "Derullo"
    expect(getLastName(cacM)).toBe(result)
    expect(getLastName(cacN)).toBe(result)
  });
  it('should get dodID', () => {
    const result = "1582006296"
    expect(getDoDID(cacM)).toBe(result)
    expect(getDoDID(cacN)).toBe(result)
  });
  it('should get the social security number', () => {
    const result = "4037173"
    expect(getSSN(cacM)).toBe('');
    expect(getSSN(cacN)).toBe(result);
  });

  it('should get dateOfBirth', () => {
    const result = new Date(1998, 7, 17)
    expect(getDoB(cacM)).toStrictEqual(result)
    expect(getDoB(cacN)).toStrictEqual(result)
  });
});


