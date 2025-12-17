import { Link, Slot, Stack } from "expo-router";

function Header() {
  return (
    <>
      <Link href="/home">Home</Link>
      <Link href="/home/about">About</Link>
    </>
  );
}

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Slot />
    </>
  );
}