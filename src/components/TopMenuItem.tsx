import Link from 'next/link'

export default function TopMenuItem({title, pageRef} : {title:string, pageRef:string}) {
    return (
        <Link className='w-[120px] text-center my-auto font-sans text-xs text-gray' href={pageRef}>
            {title}
        </Link>
    );
}