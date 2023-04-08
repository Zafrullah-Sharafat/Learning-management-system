import DashboardNavs from "../navs/DashboardNavs";

export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardNavs />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">{children}</div>
        </div>
      </section>
    </>
  );
}
