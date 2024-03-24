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
        className="w-[120px] text-center my-auto font-sans text-xs text-gray cursor-pointer"
        onClick={() => onLogout()}
      >
        {title}
      </div>
    );
  }

  if (pageRef) {
    return (
      <Link
        className="w-[120px] text-center my-auto font-sans text-xs text-gray"
        href={pageRef}
      >
        {title}
      </Link>
    );
  }
}
