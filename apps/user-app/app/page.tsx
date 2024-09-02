"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import Link from "next/link";
import MainPage from "../components/MainPage";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div>
        {!session && (
          <div
            className={`flex justify-center align-center flex-col h-full w-full mx-auto`}
          >
            <Link href={"/signup"}>Sign Up</Link>
            <Link href={"/api/auth/signin"}>Sign In</Link>
          </div>
        )}
      </div>
      <div>{session && <MainPage />}</div>
    </div>
  );
}
