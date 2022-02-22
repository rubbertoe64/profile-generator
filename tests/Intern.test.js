const Intern = require('../lib/Intern')
const newIntern = new Intern('Robert', 12, "test@gmail.com", "UCSD" )
describe('Intern', () => {
    it('should return name', () => {
        expect(newIntern.getName()).toBe('Robert')
    });
    it('should return id', () => {
        expect(newIntern.getId()).toBe(12)
    });
    it('should return email', () => {
        expect(newIntern.getEmail()).toBe('test@gmail.com')
    });
    it('should return role', () => {
        expect(newIntern.getRole()).toBe('Intern')
    });
    it('should return github', () => {
        expect(newIntern.getSchool()).toBe('UCSD')
    })

})