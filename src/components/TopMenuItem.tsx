import Link from "next/link";

export default function TopMenuItem({
  title,
  pageRef,
  onLogout,
}: {
  title: string;
  pageRef?: string;
  onLogout?: Function;
}) {
  if (!pageRef && onLogout) {
    return (
      <div
        className="w-[120px] text-center my-auto font-sans text-xs text-yellow-50 cursor-pointer"
        onClick={() => onLogout()}
      >
        {title}
      </div>
    );
  }

  if (pageRef) {
    return (
      <Link
        className="w-fit m-5 text-center my-auto font-sans text-xs text-yellow-50"
        href={pageRef}
      >
        {title}
      </Link>
    );
  }
}
