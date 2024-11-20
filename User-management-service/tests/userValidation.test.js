import { expect } from 'chai';

describe('User Management Service', function () {
    it('should test the user creation logic', function () {
        const user = {
            name: 'John Doe',
            email: 'john.dssoe@example.com',
            preferences: ['Tech', 'News'],
            communicationChannel: 'email'
        };

        expect(user).to.have.property('name').that.equals('John Doe');
        expect(user).to.have.property('email').that.equals('john.doe@example.com');
        expect(user.preferences).to.include.members(['Tech', 'News']);
        expect(user.communicationChannel).to.equal('email');
    });
});
