const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]">
      <div className="lg:h-5/6 h-full mt-14 lg:mt-0 w-11/12 justify-center flex">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
