import dynamic from 'next/dynamic';
import Product from '@/models/Product';
import db from '../utils/db';
import User from '../models/User';

const App = dynamic(() => import('../components/AppShell'), {
  ssr: false,
});

export default function Index({ users, products }) {
  return <App users={users} products={products} />;
}


export const getServerSideProps = async () =>  {
  await db.connect()
  const products = await Product.find().lean()
  const users = await User.find().lean()

  return {
    props: {
      products: products.map(db.convertDocToObj),
      users: users.map(db.convertDocToObj),
    }
  }
}
