import SignUp from './SignUpForm';

export default async function SignUpPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  //   const csrfToken = await getCsrfToken();
  const callbackUrl =
    typeof searchParams?.callbackUrl === 'string'
      ? searchParams.callbackUrl
      : '/';
  return (
    <>
      <SignUp callbackUrl={callbackUrl} />
    </>
  );
}
