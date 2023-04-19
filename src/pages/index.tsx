import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next/types';
import { useAuth } from '@/infra/contexts/auth-contexts';

const Home: NextPage = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push('/home');
    } else {
      router.push('login')
    }
  }, [router]);

  return <div />;
};

export default Home;
