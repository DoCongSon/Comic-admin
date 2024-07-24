import { AuthPage } from '@refinedev/antd';

export const Login = () => {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  return (
    <AuthPage
      type='login'
      registerLink={false}
      forgotPasswordLink={false}
      formProps={{
        initialValues: {
          email,
          password,
          remember: Boolean(email && password),
        },
      }}
    />
  );
};
