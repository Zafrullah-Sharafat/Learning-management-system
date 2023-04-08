import UserNav from "../navs/UserNav";

export default function UserLayout({ children }) {
  return (
    <>
      <UserNav />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">{children}</div>
      </section>
    </>
  );
}
