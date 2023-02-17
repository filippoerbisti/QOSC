import Product from '../../models/Product';
import User from '../../models/User';
import Contact from '../../models/Contact';
import Group from '../../models/Group';
import data from '../../utils/data';
import { contacts } from '@/mock';
import { groups } from '@/mock';
import db from '../../utils/db';

const handler = async (req, res) => {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await Contact.deleteMany();
    await Contact.insertMany(contacts);
    await Group.deleteMany();
    await Group.insertMany(groups);
    await db.disconnect();
    res.send({ message: 'seeded successfully' });
};

export default handler;