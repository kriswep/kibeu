import { Session } from 'next-auth';

type Props = {
  data: Session['user'];
};

export default function UserInformation({ data }: Props) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
