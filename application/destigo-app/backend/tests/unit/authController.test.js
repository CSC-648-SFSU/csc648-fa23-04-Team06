const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User'); // Correct the import path
const authController = require('../../controllers/authController');

describe('Auth Controller', () => {
  describe('POST /register', () => {
    it('should create a new user and return a success message', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword',
          // Add other required fields as needed
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Mocking User.findOne and User.create
      sinon.stub(User, 'findOne').resolves(null);
      sinon.stub(User, 'create').resolves({ _doc: { /* mocked user document */ } });

      await authController.post('/register', req, res);

      // Assertions
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'Registration successful. Please log in to continue.' })).to.be.true;

      // Restore the stubs
      User.findOne.restore();
      User.create.restore();
    });

    it('should return a 400 status if the email already exists', async () => {
      const req = {
        body: {
          email: 'existing@example.com',
          password: 'testpassword',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Mocking User.findOne to simulate an existing user
      sinon.stub(User, 'findOne').resolves({});

      await authController.post('/register', req, res);

      // Assertions
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ message: 'An account with this email already exists. Please log in.' })).to.be.true;

      // Restore the stub
      User.findOne.restore();
    });

    it('should return a 500 status if an error occurs', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Mocking User.findOne and User.create to simulate an error
      sinon.stub(User, 'findOne').rejects(new Error('Database error'));
      sinon.stub(User, 'create').rejects(new Error('Database error'));

      await authController.post('/register', req, res);

      // Assertions
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;

      // Restore the stubs
      User.findOne.restore();
      User.create.restore();
    });
  });

  describe('POST /login', () => {
    it('should login a user and return user details with a token', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Mocking User.findOne and bcrypt.compare
      sinon.stub(User, 'findOne').resolves({ _id: 'user123', password: await bcrypt.hash('testpassword', 10) });
      sinon.stub(bcrypt, 'compare').resolves(true);

      await authController.post('/login', req, res);

      // Assertions
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.object)).to.be.true;

      // Restore the stubs
      User.findOne.restore();
      bcrypt.compare.restore();
    });

    it('should return a 401 status if the email or password is invalid', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'invalidpassword',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Mocking User.findOne to simulate a user not found
      sinon.stub(User, 'findOne').resolves(null);

      await authController.post('/login', req, res);

      // Assertions
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ message: 'Invalid credentials' })).to.be.true;

      // Restore the stub
      User.findOne.restore();
    });

    it('should return a 500 status if an error occurs during login', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Mocking User.findOne to simulate an error
      sinon.stub(User, 'findOne').rejects(new Error('Database error'));

      await authController.post('/login', req, res);

      // Assertions
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;

      // Restore the stub
      User.findOne.restore();
    });
  });
});
