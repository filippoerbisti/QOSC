import dynamic from 'next/dynamic';
import db from '../utils/db';
import User from '../models/User';
import Contact from '../models/Contact';
import Group from '../models/Group';

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

export default function Index({ users, contacts, groups }) {
  return <App users={users} contacts={contacts} groups={groups} />;
}

export const getServerSideProps = async () =>  {
  try {
    await db.connect()
    const users = await User.find().lean()
    const contacts = await Contact.find().lean()
    const groups = await Group.find().lean()

    return {
      props: {
        users: users.map(db.convertDocToObj),
        contacts: contacts.map(db.convertDocToObj),
        groups: groups.map(db.convertDocToObj),
      }
    }
  } catch (e) {
    console.error(e);
  }
}
