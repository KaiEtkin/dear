import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href = "/joinfamily"><button>Join Family</button></Link>
      <Link href = "/createfamily"><button>Create Family</button></Link>
    </>
  )
}
