const Engineer = require('../lib/Engineer')
const newEngineer = new Engineer('Robert', 12, "test@gmail.com", "rubbertoe64" )
describe('Engineer', () => {
    it('should return name', () => {
        expect(newEngineer.getName()).toBe('Robert')
    });
    it('should return id', () => {
        expect(newEngineer.getId()).toBe(12)
    });
    it('should return email', () => {
        expect(newEngineer.getEmail()).toBe('test@gmail.com')
    });
    it('should return role', () => {
        expect(newEngineer.getRole()).toBe('Engineer')
    });
    it('should return github', () => {
        expect(newEngineer.getGithub()).toBe('rubbertoe64')
    })

})

