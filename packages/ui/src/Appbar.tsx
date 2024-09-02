import { Button } from "./button";

interface AppbarProps {
  user: any;
  // TODO: can u figure out what the type should be here?
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4">
      <a className="text-lg flex flex-col justify-center" href="/dashboard">
        V Wallet
      </a>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
