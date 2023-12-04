const { expect } = require('chai');
const sinon = require('sinon');
const blogController = require('../../controllers/blogController');
const Blog = require('../../models/Blog');

describe('Blog Controller', () => {
  describe('GET /blogs', () => {
    it('should return a list of blogs', async () => {
     
    });

    it('should handle errors and return a 500 status', async () => {
      sinon.stub(Blog, 'find').rejects(new Error('Database error'));
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.get('/blogs', req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;

      Blog.find.restore();
    });
  });

  describe('GET /find/:id', () => {
    it('should return a specific blog by ID and update views', async () => {
      const blogId = '123';
      const blog = { _id: blogId, title: 'Test Blog', views: 5 };
      sinon.stub(Blog, 'findById').resolves(blog);
      sinon.stub(blog, 'save').resolves(blog);

      const req = { params: { id: blogId } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.get('/find/:id', req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(blog)).to.be.true;
      expect(blog.views).to.equal(6); // Views should be incremented by 1

      Blog.findById.restore();
      blog.save.restore();
    });

    it('should handle errors and return a 500 status', async () => {
      const blogId = '123';
      sinon.stub(Blog, 'findById').rejects(new Error('Database error'));
      const req = { params: { id: blogId } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.get('/find/:id', req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;

      Blog.findById.restore();
    });
  });

  describe('GET /featured', () => {
    it('should return a list of featured blogs', async () => {
      sinon.stub(Blog, 'find').resolves([{ title: 'Featured Blog 1' }, { title: 'Featured Blog 2' }]);
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.get('/featured', req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(sinon.match.array)).to.be.true;

      Blog.find.restore();
    });

    it('should handle errors and return a 500 status', async () => {
      sinon.stub(Blog, 'find').rejects(new Error('Database error'));
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.get('/featured', req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;

      Blog.find.restore();
    });
  });

  describe('POST /', () => {
    it('should create a new blog', async () => {
      const newBlog = { title: 'New Blog', content: 'This is a new blog.' };
      sinon.stub(Blog, 'create').resolves(newBlog);

      const req = { body: newBlog, user: { id: 'userId123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.post('/', req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(newBlog)).to.be.true;

      Blog.create.restore();
    });

    it('should handle errors and return a 500 status', async () => {
      const newBlog = { title: 'New Blog', content: 'This is a new blog.' };
      sinon.stub(Blog, 'create').rejects(new Error('Database error'));

      const req = { body: newBlog, user: { id: 'userId123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.post('/', req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;

      Blog.create.restore();
    });
  });

  describe('PUT /updateBlog/:id', () => {
    it('should update a specific blog by ID', async () => {
      const blogId = '123';
      const updatedBlog = { _id: blogId, title: 'Updated Blog' };
      sinon.stub(Blog, 'findById').resolves(updatedBlog);
      sinon.stub(updatedBlog, 'save').resolves(updatedBlog);

      const req = { params: { id: blogId }, body: { title: 'Updated Blog' }, user: { id: 'userId123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.put('/updateBlog/:id', req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(updatedBlog)).to.be.true;

      Blog.findById.restore();
      updatedBlog.save.restore();
    });

    it('should handle errors and return a 500 status', async () => {
      const blogId = '123';
      sinon.stub(Blog, 'findById').rejects(new Error('Database error'));

      const req = { params: { id: blogId }, body: { title: 'Updated Blog' }, user: { id: 'userId123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.put('/updateBlog/:id', req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;

      Blog.findById.restore();
    });
  });

  describe('PUT /likeBlog/:id', () => {
    it('should like or unlike a specific blog by ID', async () => {
      const blogId = '123';
      const likedBlog = { _id: blogId, title: 'Liked Blog', likes: ['userId123'] };
      sinon.stub(Blog, 'findById').resolves(likedBlog);
      sinon.stub(likedBlog, 'save').resolves(likedBlog);

      const reqLike = { params: { id: blogId }, user: { id: 'userId123' } };
      const reqUnlike = { params: { id: blogId }, user: { id: 'userId124' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await blogController.put('/likeBlog/:id', reqLike, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ msg: 'Successfully liked the blog' })).to.be.true;

      await blogController.put('/likeBlog/:id', reqUnlike, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ msg: 'Successfully unliked the blog' })).to.be.true;

      Blog.findById.restore();
      likedBlog.save.restore();
    });

    it('should handle errors and return a 500 status', async () => {
      const blogId = '123';
      sinon.stub(Blog, 'findById').rejects(new Error('Database error'));

      const req = { params: { id: blogId }, user: { id: 'userId123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.put('/likeBlog/:id', req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;

      Blog.findById.restore();
    });
  });

  describe('DELETE /deleteBlog/:id', () => {
    it('should delete a specific blog by ID', async () => {
      const blogId = '123';
      const blogToDelete = { _id: blogId, title: 'Blog to Delete', userId: 'userId123' };
      sinon.stub(Blog, 'findById').resolves(blogToDelete);
      sinon.stub(blogToDelete, 'remove').resolves(blogToDelete);

      const req = { params: { id: blogId }, user: { id: 'userId123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.delete('/deleteBlog/:id', req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ msg: 'Successfully deleted the blog' })).to.be.true;

      Blog.findById.restore();
      blogToDelete.remove.restore();
    });

    it('should handle errors and return a 500 status', async () => {
      const blogId = '123';
      sinon.stub(Blog, 'findById').rejects(new Error('Database error'));

      const req = { params: { id: blogId }, user: { id: 'userId123' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };
      await blogController.delete('/deleteBlog/:id', req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith(sinon.match.has('error'))).to.be.true;

      Blog.findById.restore();
    });
  });
});
