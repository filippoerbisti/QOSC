import bcrypt from 'bcryptjs';

const data = {
    users: [
      {
        name: 'Filippo',
        email: 'filippo.erbisti@example.com',
        password: bcrypt.hashSync('Filippo1.'),
      },
      {
        name: 'Jane',
        email: 'user@example.com',
        password: bcrypt.hashSync('123456'),
      },
    ],
}

export default data;